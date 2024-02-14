// possible yt links
// https://www.youtube.com/watch?v=KK7K08dAtR4
// https://www.youtube.com/embed/KK7K08dAtR4
// https://youtu.be/KK7K08dAtR4?si=PCAHGyHuNK_yf72S

import { zodVideoSchema } from "@/zod/zod.common";

// https://stackoverflow.com/questions/21607808/convert-a-youtube-video-url-to-embed-code
function getId(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return match && match[2].length === 11 ? match[2] : null;
}

function getLoomId(url: string): string | null {
  const regExp = /^.*(loom.com\/(?:share|embed)\/|\/)([^\/?#&]+).*/;
  const match = url.match(regExp);
  return match && match[2] ? match[2] : null;
}

// possible loom links
// https://www.loom.com/share/5a54598a553042cfa6424c294db11fdd?sid=ac424aee-f3e2-4def-96b5-520cd8638164
// https://www.loom.com/embed/e5b8c04bca094dd8a5507925ab887002
export const convertVideoLinkToEmbed = (url: string) => {
  try {
    const videoLink = zodVideoSchema.parse(url);
    let videoId: string | null = null;
    if (videoLink.includes("loom")) {
      videoId = getLoomId(videoLink);
      return videoId ? `https://www.loom.com/embed/${videoId}` : null;
    } else {
      videoId = getId(videoLink);
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }
  } catch (error) {
    console.error("Error in convertYoutubeLinkToEmbed", error);
    return null;
  }
};
