import React from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
} from "react-share";

interface SocialShareWrapperProps {
  platform: "facebook" | "twitter" | "whatsapp" | "linkedin";
  url: string;
  title?: string;
  description?: string;
  hashtag?: string;
  children: React.ReactNode;
}

const platformMap = {
  facebook: FacebookShareButton,
  twitter: TwitterShareButton,
  whatsapp: WhatsappShareButton,
  linkedin: LinkedinShareButton,
};

export const SocialShareWrapper: React.FC<SocialShareWrapperProps> = ({
  platform,
  url,
  title,
  description,
  hashtag,
  children,
}) => {
  const ShareButton = platformMap[platform];

  if (!ShareButton) {
    throw new Error(`Unsupported platform: ${platform}`);
  }

  return (
    <ShareButton url={url} title={title} description={description} hashtag={hashtag}>
      {children}
    </ShareButton>
  );
};
