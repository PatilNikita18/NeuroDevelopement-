import { clerkClient } from "@clerk/express";

export type ClerkUserInfo = {
  name: string;
  email: string;
};

// Reads the signed-in user's name and email from Clerk.
// Never throws: if Clerk can't be reached, safe defaults are returned.
export const getClerkUserInfo = async (
  userId: string
): Promise<ClerkUserInfo> => {
  try {
    const user = await clerkClient.users.getUser(userId);

    const email =
      user.emailAddresses.find((e) => e.id === user.primaryEmailAddressId)
        ?.emailAddress ||
      user.emailAddresses[0]?.emailAddress ||
      "";

    const fullName = [user.firstName, user.lastName]
      .filter(Boolean)
      .join(" ")
      .trim();

    const name =
      fullName || user.username || (email ? email.split("@")[0] : "") || "Learner";

    return { name, email };
  } catch (error) {
    console.error("⚠️ Could not read user from Clerk:", error);
    return { name: "Learner", email: "" };
  }
};