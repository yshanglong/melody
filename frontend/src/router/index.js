import { createRouter, createWebHistory, createWebHashHistory } from "vue-router"
import storage from "../utils/storage"

const routes = [
    {
        path: '/',
        component: () => import('../views/pc/Home.vue')             
    },
    {
        path: '/account',
        name: "Account",
        component: () => import('../views/pc/Account.vue')   
    },
    {
        path: '/playlist',
        name: "Playlist",
        component: () => import('../views/pc/Playlist.vue')   
    },
]
export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

router.beforeEach((to, from, next) => {
    if (to.path === "/account") {
      next();
      return;
    }
    const mk = storage.get('mk')
    const wyAccount = storage.get('wyAccount')
    if (!mk) {
        next("/account");
    }
    if (to.path === "/playlist" && !wyAccount) {
        next("/account");
        return;
    }
    next();
  });
 
export default router