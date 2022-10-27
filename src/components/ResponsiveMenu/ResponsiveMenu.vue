<script>
import ResponsiveMenuItem from './ResponsiveMenuItem'
import VueUtils from '@/utils/vueUtils'

export default
{
    name: 'responsive-menu',

    props:
    {
        orientation: { type: String, default: 'horizontal' },
        visible: { type: Boolean, default: true }
    },

    created ()
    {
    },

    render () 
    {
        return (
            <div ref='menu' class={'responsive-menu ' + this.barOrientation} style={{ visibility: this.isVisible ? 'visible' : 'hidden' }}>
                { this.$slots.default }
            </div>
        )
    },

    data () 
    {
        return {
            activeMenuItem: null,
            isVisible: this.visible,
            barOrientation: this.orientation
        }
    },

    computed:
    {
    },

    watch:
    {
        orientation ()
        {
            this.barOrientation = this.orientation
        },
        visible ()
        {
            this.isVisible = this.visible
        },
        
        activeMenuItem (after, before)
        {
            if (before) before.isActive = false
            if (after) after.isActive = true
        }
    },

    mounted ()
    {
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

    methods:
    {
        getMenuItems ()
        {
            return VueUtils.getChildrenOfType(this, ResponsiveMenuItem)
        },

        /**
         * @param path {string}
         */
        getMenuItemByPath (path)
        {
            const normalized = p => p.startsWith('/') ? p.substring(1) : p
            
            return this.getMenuItems().find(i => normalized(i.path) == normalized(path))
        },

        onMenuItemClicked (item)
        {
            this.selectMenuItem(item)
        },

        selectMenuItem (item)
        {
            this.activeMenuItem = item

            this.$emit('item-selected', this.activeMenuItem)
        },

        selectFirstMenuItem ()
        {
            this.selectMenuItem(this.getMenuItems()[0])
        },

        getMenuItemById (id)
        {
            return this.getMenuItems().find(item => item.id == id)
        }
    },

    components:
    {
    }
}
</script>

<style lang='less'>
@import '~@/styles/main.less';

.responsive-menu
{
    background-color: var(--theme-content-background-color);
    position: fixed;
    display: flex;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    z-index: 2;

    &.horizontal
    {
        width: 100vw;
        height: var(--theme-horizontal-menu-height);
        bottom: 0;
        flex-direction: row;
        border-radius: 15px 15px 0 0;

        & .responsive-menu-item
        {
            margin: var(--theme-horizontal-menu-item-margin);
            width: 100%;
            height: 100%;
            margin-top: 10px;

            .OnLargeMobile({ margin-top: 13px; });

            svg
            {
                width: 100%;
                margin-bottom: -5px;
                height: 40%;

                .OnLargeMobile({ height: 30%; });
            }

            .item-title
            {
                font-size: 11px;
            }
        }
    }

    &.vertical
    {
        right: 0;
        top: 0;
        width: 200px;
        flex-direction: column;
        border-radius: var(--theme-vertical-menu-border-radius);
        margin-top: 15vh;
        margin-left: var(--theme-vertical-menu-margin-left);

        & .responsive-menu-item
        {
            @item-height: 9vh;

            display: flex;
            flex-direction: row;
            align-items: center;
            padding-left: 15%;
            height: @item-height;

            &.active
            {
                background-color: var(--theme-accent-color-10-percent);

                &:after
                {
                    @border-width: 2px;
                    
                    position: absolute;
                    content: '';

                    // after some thoughs a border color on selected item is a bit too much,
                    // this code is then useless, uncomment line below if changed my mind.
                    // border-right: @border-width solid var(--theme-accent-color-90-percent);

                    height: @item-height;
                    width: 100%;
                    right: -@border-width;
                }

                &:first-of-type
                {
                    border-top-right-radius: var(--theme-vertical-menu-border-radius);
                    border-top-left-radius: var(--theme-vertical-menu-border-radius);
                }

                &:last-of-type
                {
                    border-bottom-right-radius: var(--theme-vertical-menu-border-radius);
                    border-bottom-left-radius: var(--theme-vertical-menu-border-radius);
                }
            }

            svg
            {
                width: 20%;

                .OnDesktop({
                    width: 8%;
                });
            }

            .item-title
            {
                margin-left: 10%;
                font-size: 1.7vh;
            }
        }
    }
}
</style>