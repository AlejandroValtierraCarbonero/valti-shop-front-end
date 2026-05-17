import { vi } from 'vitest'

class ResizeObserverMock {
  observe = vi.fn<() => void>()
  unobserve = vi.fn<() => void>()
  disconnect = vi.fn<() => void>()
}

vi.stubGlobal('ResizeObserver', ResizeObserverMock)
