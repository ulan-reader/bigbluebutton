export function addTypedEventListener<T>(
  target: Window,
  type: string,
  listener: (event: CustomEvent<T>) => void
) {
  target.addEventListener(type, listener as EventListener);
  return () => target.removeEventListener(type, listener as EventListener);
}
