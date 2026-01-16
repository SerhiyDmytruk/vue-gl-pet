<script setup lang="ts">
import { RouterLink } from 'vue-router'
import router from '../router/'

const routes = router.options.routes
</script>

<template>
  <nav>
    <ul>
      <li v-for="item in routes" :key="item.name">
        <span v-if="item.children">{{ item.name }}</span>
        <RouterLink v-else :to="item.path">{{ item.name }}</RouterLink>

        <ul v-if="item.children">
          <li v-for="link in item.children" :key="link.name">
            <RouterLink :to="item.path + '/' + link.path">
              {{ link.name }}
            </RouterLink>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
  display: flex;
  flex-flow: column wrap;
  text-wrap: nowrap;
}

nav ul {
  list-style: none;
  padding: 0;
}

nav a.router-link-exact-active {
  color: var(--color-text);
  text-decoration: underline;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
