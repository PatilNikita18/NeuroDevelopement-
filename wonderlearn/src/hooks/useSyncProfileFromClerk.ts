import { useEffect } from "react";
import { useUser } from "@clerk/react";
import { useChildProfileStore } from "@/stores/childProfileStore";

export function useSyncProfileFromClerk() {
  const { user, isLoaded } = useUser();
  const setProfile = useChildProfileStore((s) => s.setProfile);

  useEffect(() => {
    if (!isLoaded || !user) return;

    const meta = user.unsafeMetadata as Record<string, any>;
    if (meta?.childName) {
      setProfile({
        name: meta.childName,
        nickname: meta.childNickname,
        ageRange: meta.ageRange,
        condition: meta.condition,
        preferences: meta.preferences,
        avatar: meta.avatar,
        sessionDuration: meta.sessionDuration,
      });
    }
  }, [isLoaded, user, setProfile]);
}