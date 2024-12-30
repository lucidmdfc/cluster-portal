"use server";
// Ensure the file runs exclusively on the server (Next.js 13+ feature for Server Actions)

// Import necessary libraries
import { auth } from "@clerk/nextjs/server"; // Clerk provides server-side authentication tools
import { client } from "src/lib/client"; // Sanity client to interact with the Sanity database
import { getPersonalSpaceQuery } from "src/lib/queries"; // GROQ query for fetching personal space data from Sanity
import { z } from "zod"; // Zod for schema validation

/**
 * FORM_TYPES acts as a registry for all allowed form types.
 * This avoids hardcoding strings and ensures that adding new form types is straightforward.
 */
const FORM_TYPES = {
  PERSONAL_SPACE: "candidate", // Represents authenticated user forms
  PUBLIC_FORM: "projectCollaboratifs", // Represents general, unauthenticated user forms
};

/**
 * Handles form submissions by delegating processing to the appropriate handler.
 *
 * @param formData - The FormData object containing all submitted fields.
 * @param formType - A string indicating the type of form ('personalSpace', 'publicForm', etc.).
 * @returns A response object indicating success or failure, with associated data or error messages.
 */
export async function handleFormSubmission(
  formData: FormData,
  formType: string
) {
  console.log(formType)
  try {
    // Validate the provided form type against allowed types
    if (!Object.values(FORM_TYPES).includes(formType)) {
      throw new Error("Invalid form type"); // Prevent processing of unsupported form types
    }
    // Delegate handling to the appropriate function based on the form type
    return formType === FORM_TYPES.PERSONAL_SPACE
      ? await handlePersonalSpaceForm(formData)
      : await handlePublicForm(formData);
  } catch (error) {
    // Log and return a structured error response
    console.error("[Error in handleFormSubmission]:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Handles forms for personal space (authenticated user forms).
 *
 * NOTE FOR STUDENTS: Declare and process fields specific to **Personal Space forms** here.
 *
 * @param formData - The FormData object containing submitted fields.
 * @returns A success or failure response.
 */
async function handlePersonalSpaceForm(formData: FormData) {
  try {
    // Authenticate the user using Clerk and retrieve their user ID
    const { userId } = await auth();
    // If no user is authenticated, reject the request
    if (!userId) throw new Error("Authentication required to submit this form");
      // console.log("user ID"+userId);

    // Fetch existing user data from Sanity (specific to personal space form logic)
    const userData = await client.fetch(getPersonalSpaceQuery, { clerkId:userId });

    // const cvFile = formData.get("files") as File | null;
    const cvFiles = formData.getAll("files[]");
    let uploadedCvId: string | undefined;
    const cvFile = cvFiles[0] as File; 
    if (cvFile) {
      // Upload the file to Sanity
      const uploadResponse = await client.assets.upload("file", cvFile, {
        filename: cvFile.name,
      });

      console.log("Uploaded CV:", uploadResponse);
      uploadedCvId = uploadResponse._id;
    }

    // Zod validation schema for personal space form fields
    const personalSpaceSchema = z.object({
      firstName: z.string().min(1, "First Name is required"),
      lastName: z.string().min(1, "Last Name is required"),
      email: z.string().min(1, "email is required"),
      phone: z.string().min(1, "phone is required"),
      birthday: z.string().min(1, "birthday is required"),
      gender: z.string().min(1, "gender is required"),
      address: z.string().min(1, "street Address is required"),
      city: z.string().min(1, "city is required"),
    });

    // Validate the form data
    const parsedData = personalSpaceSchema.parse({
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      birthday: formData.get("birthday"),
      gender: formData.get("gender"),
      address: formData.get("address"),
      city: formData.get("city"),
    });

    // Merge the existing user data with the new data
    const updatedData = {
      _type: FORM_TYPES.PERSONAL_SPACE,
      ...userData, // Preserve existing user data
      _id: userId,
      clerkId:userId,
      CV: {
      _type: 'file',
      asset: {
        _type: 'reference',
        _ref: uploadedCvId, // Link the uploaded file via the asset reference
      },},
      firstName: parsedData.firstName,
      lastName: parsedData.lastName,
      email: parsedData.email,
      phone: parsedData.phone,
      address:parsedData.address,
      city:parsedData.city,
      gender:parsedData.gender,
      birthday:parsedData.birthday,
    };

    // Save updated data to Sanity (replaces the document if it exists, creates otherwise)
    await client.createOrReplace(updatedData);

    return { success: true, data: updatedData }; // Return the updated data
  } catch (error) {
    // Log and return a failure response
    console.error("[Error in handlePersonalSpaceForm]:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Handles public forms (accessible without authentication).
 *
 * NOTE FOR STUDENTS: Declare and process fields specific to **Public Forms** here.
 *
 * @param formData - The FormData object containing submitted fields.
 * @returns A success or failure response.
 */
async function handlePublicForm(formData: FormData) {
  try {
    // Zod validation schema for public form fields
    const projectCollaborationSchema = z.object({
      entrepriseName: z
        .string()
        .min(1, { message: "Nom de votre entreprise est obligatoire" }),
      partenaires: z
        .array(z.string())
        .optional(),
      projectTitle: z
        .string()
        .min(1, { message: "Titre du projet est obligatoire" }),
      projectDescription: z
        .string()
        .min(1, { message: "Descriptif du projet est obligatoire" }),
      budgetEstimation: z
        .preprocess(
          (value) => (typeof value === "string" ? parseFloat(value) : value),
          z.number().min(1, { message: "Budget estimatif doit être supérieur à 0" })
      ),
    });
    
    const Files = formData.getAll("projectPresentation[]");
    let uploadedId: string | undefined;
    const File = Files[0] as File; 
    if (File) {
      // Upload the file to Sanity
      const uploadResponse = await client.assets.upload("file", File, {
        filename: File.name,
      });

      // console.log("Uploaded file:", uploadResponse);
      uploadedId = uploadResponse._id;
    }
    // console.log(Files)
    // Validate the form data
    const parsedData = projectCollaborationSchema.parse({
      entrepriseName: formData.get("entrepriseName"), // Retrieve the 'name' field
      partenaires: formData.getAll("partenaires"), 
      projectTitle: formData.get("projectTitle"), 
      projectDescription: formData.get("projectDescription"), 
      budgetEstimation: formData.get("budgetEstimation"), 
    });
    console.log(formData.getAll("partenaires"))
    // Construct a new data object for this form submission
    const newPublicData = {
      _type: FORM_TYPES.PUBLIC_FORM, // Label the type of document for Sanity
      entrepriseName: parsedData.entrepriseName, 
      partenaires: parsedData.partenaires, 
      projectTitle: parsedData.projectTitle, 
      projectDescription: parsedData.projectDescription,
      budgetEstimation: parsedData.budgetEstimation,
      projectPresentation: {
      _type: 'file',
      asset: {
        _type: 'reference',
        _ref: uploadedId, // Link the uploaded file via the asset reference
      },},
    };
    // console.log("from public space")

    // Save the new data to Sanity as a new document
    await client.create(newPublicData);

    return { success: true, data: newPublicData }; // Return the newly created data
  } catch (error) {
    // Log and return a failure response
    console.error("[Error in handlePublicForm]:", error);
    return { success: false, error: error.message };
  }
}
