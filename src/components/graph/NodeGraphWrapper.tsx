import { NodeGraphA } from "./NodeGraphA"
import { NodeGraphB } from "./NodeGraphB"

export function NodeGraphWrapper() {
  const variant = new URLSearchParams(window.location.search).get("graph") ?? "b"
  return variant === "a" ? <NodeGraphA /> : <NodeGraphB />
}
