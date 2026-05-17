import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'

const vuetify = createVuetify({ components, directives })

const router = createRouter({
  history: createWebHistory(),
  routes: [],
})

describe('App', () => {
  it('mounts renders properly', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [vuetify, router],
        stubs: { SideNavigation: true },
      },
    })
    expect(wrapper.text()).toContain('Valti Shop')
  })
})
