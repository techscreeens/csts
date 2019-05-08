export default function(localStorageKey) {
  let savedState;
  try {
    savedState = JSON.parse(localStorage.getItem(localStorageKey));
  } catch (e) {
    console.error("Failed to deserialize stored state", e);
    localStorage.removeItem(localStorageKey);
  }

  if (savedState) {
    Object.entries(savedState.ideas).forEach(([key, idea]) => {
      savedState.ideas[key] = {
        ...idea,
        createdAt: new Date(idea.createdAt),
        updatedAt: new Date(idea.updatedAt)
      };
    });

    return savedState;
  } else {
    return {
      ideas: {},
      orderBy: "createdAt"
    };
  }
}
