<script>
export default
{
    name: 'responsive-menu-item',

    props:
    {
        icon: { required: true },
        name: { type: String, required: true },
        id: { type: String },
        path: { type: String },
        notificationDotActive: { type: Boolean }
    },

    created ()
    {
    },

    render () 
    {
        return (
            <div class='responsive-menu-item' on-click={this.onClick}>
                <inline-svg src={this.icon} add-class='icon' />
                <span class='item-title'>{ this.name }</span>
                <div class={`notification-dot ${this.notificationDotActive ? 'active' : ''}`} />
            </div>
        )
    },

    mounted ()
    {
    },

    data () 
    {
        return {
            isActive: false
        }
    },

    computed:
    {
        
    },

    watch:
    {
        isActive ()
        {
            if (this.isActive) this.$el.classList.add('active')
            else this.$el.classList.remove('active')
        }
    },

    methods:
    {
        onClick (e)
        {
            this.$emit('click', e)
        }
    },

    components:
    {
    }
}
</script>

<style lang='less'>
@import '~@/styles/main.less';

.responsive-menu-item
{
    position: relative;
    cursor: pointer;
    
    svg
    {
        cursor: pointer;
        fill: var(--theme-border-color-extra-strong);
        stroke: var(--theme-border-color-extra-strong);
        height: 100%;
    }

    &.active
    {
        svg
        {
            fill: var(--theme-accent-color-text);
            stroke: var(--theme-accent-color-text);
        }

        .item-title
        {
            color: var(--theme-accent-color-text);
        }
    }

    .item-title
    {
        color: var(--theme-text-color-extra-light);

        .CapitalizeFirstLetter();
    }

    .notification-dot
    {
        opacity: 0;
        position: absolute;
        width: 0px;
        height: 0px;
        background-color: var(--theme-border-color-extra-strong);
        border-radius: 50%;
        transition: all 0.5s ease-in-out;
        border: 2px solid var(--theme-content-background-color);
        top: 3px;
        right: calc(50% - 6px);

        .OnDesktop({
            top: calc(37% + 3px);
            right: calc(82% - 6px);
        });

        &.active
        {
            opacity: 1;
            width: 8px;
            height: 8px;
            right: calc(50% - 11px);
            top: -2px;
            background-color: var(--theme-accent-color-text);

            .OnDesktop({
                top: calc(37% + -2px);
                right: calc(82% - 11px);
            });
        }
    }
}
</style>