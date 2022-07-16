import { gun } from "./initGun.js"
import { writable } from "svelte/store"

function createStore(ref, initialValue) {
    const { set, subscribe } = writable(initialValue)
    ref.on(set)
    return {
        subscribe
    }
}

const todosRef = gun.get("todos")
export const todos = createStore(todosRef, {})
