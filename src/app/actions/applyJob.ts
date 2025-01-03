"use server";

// Necessary imports
import { auth } from "@clerk/nextjs/server"; // Handles authentication using Clerk
import { redirect } from "next/navigation"; // Server-side redirection in Next.js 14
import { client } from "src/lib/client"; // Sanity client to interact with Sanity
import { APPLICATION_QUERY, getPersonalSpaceQuery } from "src/lib/queries"; // GROQ query to fetch user data
import { paths } from 'src/routes/paths';

/**
 * Server action to allow authenticated users to apply for a job.
 * 
 * @param jobId - The ID of the job being applied for.
 * @returns Success or failure response based on the result of submitting the application.
 */
export async function applyForJob(jobId: string) {
  try {
    // Authentication check (Best Practice)
    const { userId } = await auth();

    // Fetching user data from Sanity
    const userData = await client.fetch(getPersonalSpaceQuery, { clerkId: userId });
    const application = await client.fetch(APPLICATION_QUERY, { candidateId: userId, jobId });
    
    // If no user data is found, throw an error to inform the user.
    if (userData.length < 1) {
      return { success: false, redirectTo: "/account/personal" };
    }
    if (application && application.length > 0) {
      console.log(application)
      return { success: false, message: 'Vous avez déjà postulé à cette offre.' };
    }

    // Job application data (Sanity document creation)
    const applicationData = {
      _type: "application", // Document type in Sanity
      job: {
        _type: "reference",
        _ref: jobId, // Reference to The job ID being applied for
      },
      candidate: {
        _type: "reference",
        _ref: userId, // Reference to the authenticated user
      },
      applicationDate: new Date().toISOString(), // Timestamp of the application
      status: "pending", // Initial status of the application
    };

    // Saving the application data in Sanity
    await client.create(applicationData);

    // Return a success response after the application is successfully submitted
    return { success: true, message: "Candidature envoyée avec succès" };
  
  } catch (error) {
    // Error handling (Best Practice)
    console.error("[Error in applyForJob]:", error);
    return { success: false, error: error.message }; // Return a failure response with the error message.
  }
}
