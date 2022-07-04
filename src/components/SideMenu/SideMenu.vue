<script>
import SideMenuItem from './SideMenuItem'
import SideMenuSeparator from './SideMenuSeparator'
import MathUtils from '@/utils/mathUtils'
import TouchUtils from '@/utils/touchUtils'
import DOMUtils from '@/utils/DOMUtils'
import VueUtils from '@/utils/vueUtils'
import ZingTouch from 'zingtouch'

export default
{
    name: 'side-menu',

    props:
    {
        title: { type: String }
    },

    created ()
    {
    },

    render () 
    {
        return (
            <div class='side-menu' ref='menu'>
                <div ref='menuBackground' class='background' />
                <div ref='menuContent' class='content'>
                    <div class='title' v-show={this.title}>{this.title}</div>
                    <side-menu-separator v-show={this.title} />
                    { this.$slots.default }
                </div>
            </div>
        )
    },

    data () 
    {
        return {
            activeMenuItem: null
        }
    },

    computed:
    {
        menuItems ()
        {
            return VueUtils.getChildrenOfType(this, SideMenuItem)
        },
    },

    watch:
    {
        activeMenuItem (after, before)
        {
            if (before) before.isActive = false
            if (after) after.isActive = true
        }
    },

    mounted ()
    {
        this.hideMenu()
        this.setupTouch()
        this.$forceUpdate()
    },

    async updated ()
    {
        for (let menuItem of this.getMenuItems())
        {
            await menuItem.$off('click')
            await menuItem.$on('click', () => this.onMenuItemClicked(menuItem))
        }
    },

    beforeDestroy ()
    {
        DOMUtils.toggleBodyScrolling(true)
    },

    methods:
    {
        getMenuItems ()
        {
            return VueUtils.getChildrenOfType(this, SideMenuItem)
        },

        /**
         * @param path {string}
         */
        getMenuItemByPath (path)
        {
            const normalized = p => p.startsWith('/') ? p.substring(1) : p
            
            return this.getMenuItems().find(i => normalized(i.path) == normalized(path))
        },
        
        showMenu ()
        {
            this.setMenuSwippedPercent(0)
            DOMUtils.toggleBodyScrolling(false)
        },

        hideMenu ()
        {
            this.setMenuSwippedPercent(-100)
            DOMUtils.toggleBodyScrolling(true)
        },

        /**
         * @param percent {number}
         */
        setMenuSwippedPercent (percent)
        {
            this.$refs.menuContent.style.transform = `translateX(${percent}%)`
            this.$refs.menuBackground.style.opacity = (percent + 100) / 100
            this.$refs.menu.style.pointerEvents = percent < -99 ? 'none' : ''
            this.$refs.menu.swippedPercent = percent
        },

        onMenuItemClicked (item, e)
        {
            this.selectMenuItem(item)
            this.hideMenu()
        },

        selectMenuItem (item)
        {
            this.activeMenuItem = item

            this.$emit('item-selected', item)
        },

        selectFirstMenuItem ()
        {
            this.selectMenuItem(this.menuItems[0])
        },

        setupTouch ()
        {
            ZingTouch.Region(this.$refs.menuBackground, false, false).bind(this.$refs.menuBackground, 'tap', e =>
            {
                if (e.target == this.$refs.menuBackground)
                {
                    this.hideMenu()
                }
            })

            ZingTouch.Region(this.$refs.menu, false, false).bind(this.$refs.menu, 'swipe', e =>
            {
                const swipeData = e.detail.data[0]

                if (swipeData.currentDirection > 155 && swipeData.currentDirection < 205)
                {
                    this.hideMenu()
                }
            }, { passive: true })

            this.$refs.menu.addEventListener('touchmove', () =>
            {
                this.$refs.menu.style.transition = 'none'

                const swippedX = TouchUtils.currentTouchDelta.x
                const swippedXPercent = swippedX / innerWidth * 100
                const appliedXPercent = MathUtils.clamp(swippedXPercent, -100, 0)
                
                this.setMenuSwippedPercent(appliedXPercent)
            }, { passive: true })

            this.$refs.menu.addEventListener('touchend', () =>
            {
                this.$refs.menu.style.transition = ''

                setTimeout(() =>
                {
                    if (this.$refs.menu.swippedPercent < -60) this.hideMenu()
                    else this.showMenu()
                }, 100)

            }, { passive: true })
        }
    },

    components:
    {
        SideMenuSeparator
    }
}
</script>

<style lang='less'>
@import '~@/styles/main.less';

.side-menu
{
    position: fixed;
    top: var(--theme-status-bar-height);
    left: 0;
    width: 100vw;
    height: calc(100vh - var(--theme-status-bar-height));
    max-width: 400px;
    z-index: 3;
    transition: all .2s;

    > .background
    {
        position: fixed;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .3);
        cursor: pointer;
    }

    > .content
    {
        transition: inherit;
        position: absolute;
        width: 85%;
        height: 100%;
        background-color: var(--theme-content-background-color);
        padding-top: 5px;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;

        > .title
        {
            font-weight: 600;
            font-size: 21px;
            padding: 12px 20px;
        }

        > .side-menu-item
        {
            margin-bottom: 15px;
        }
    }
}
</style>