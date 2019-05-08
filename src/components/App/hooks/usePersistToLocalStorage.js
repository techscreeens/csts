import { useEffect, useCallback } from "react";
import debounce from "lodash/debounce";

export default function usePersistToLocalStorage(localStorageKey, state) {
  const persistState = useCallback(
    debounce(
      data => localStorage.setItem(localStorageKey, JSON.stringify(data)),
      250
    ),
    []
  );

  useEffect(() => persistState(state), [state, persistState]);
}
