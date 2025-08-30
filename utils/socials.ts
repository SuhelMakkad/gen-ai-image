export const socials = {
  github: "https://github.com/SuhelMakkad",
  linkedin: "https://www.linkedin.com/in/suhel-makkad-x/",
  email: "makadsuhel@gmail.com",
};

export const githubRepoLink = "https://github.com/SuhelMakkad/gen-ai-image";

export const getEmailLink = (subject: string, body: string) => {
  return `mailto:${socials.email}?subject=${subject}&body=${body}`;
};
