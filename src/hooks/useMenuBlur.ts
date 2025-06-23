import { useCallback, useEffect} from "react";

export default function useMenuBlur(menuRef: React.RefObject<HTMLDivElement | null>, blur: () => void) {
  const checkBlur = useCallback((e: MouseEvent) => {
    if (
      menuRef.current != null &&
      !menuRef.current.contains(e.target as Node)
    ) {
      blur();
    }
  }, [blur, menuRef]);

  useEffect(() => {
    document.addEventListener("click", checkBlur);

    return () => {
      document.removeEventListener("click", checkBlur);
    };
  }, [checkBlur]);
};