<script>
import VueUtils from '@/utils/vueUtils'
import DOMUtils from '@/utils/DOMUtils'

export default
{
    name: 'diag',

    props:
    {
        title: { type: String, required: true },
        description: { },
        buttons: { type: Array, default: () => [{ label: 'OK' }] },
        customClass: { type: String }
    },

    created ()
    {
    },

    render () 
    {
        var description = this.description
        if (typeof description == 'function')
        {
            description = description()
        }
        console.log(VueUtils.isVNode(description), description)

        return (
            <div class={`dialog ${!this.isVisible ? 'hidden' : '' } ${this.customClass}`}>
                <div class='background' ref='background' on-click={this.close} />
                <div class='modal' ref='modal'>
                        <div class='title'>{ this.title }</div>
                        <div class='content'>
                            <div>{ this.$slots.default }</div>
                            <div v-show={typeof description == 'string'} domPropsInnerHTML={ description }></div>
                            <div v-show={VueUtils.isVNode(description)}>{ description }</div>
                        </div>
                    <div class='buttons' ref='buttons'>
                    {
                        this.buttons.map(button =>
                        {
                            return (
                                <div class={`dialog-button ${button.isDanger ? 'danger' : ''}`}
                                    on-click={e => { if (button.action) button.action(e, this); this.close() }}>
                                    { button.label }
                                </div>
                            )
                        })
                    }
                    </div>
                </div>
            </div>
        )
    },

    data () 
    {
        return {
            isVisible: false
        }
    },

    watch:
    {
        isVisible ()
        {
            DOMUtils.toggleBodyScrolling(!this.isVisible)
        }
    },

    mounted ()
    {
        this.$nextTick(() =>
        {
            if (this.$refs.modal.offsetHeight / innerHeight < 0.5)
            {
                this.$refs.modal.style.marginTop = '-7vh'
            }
            if (this.buttons.length > 1) this.$refs.buttons.style.borderTopColor = 'transparent'
        })

        setTimeout(() => this.isVisible = true, 10)
    },

    beforeDestroy ()
    {
        DOMUtils.toggleBodyScrolling(true)
    },

    methods:
    {
        close ()
        {
            this.isVisible = false
            this.$refs.background.style.opacity = 0

            this.$emit('close', this)

            // turns out ios is late on that timeout
            setTimeout(() => VueUtils.destroyInstance(this), 100)
        },

        waitForCloseAsync ()
        {
            return new Promise(resolve => this.$on('close', resolve))
        }
    },

    components:
    {
    }
}
</script>

<style lang='less'>
@import '~@/styles/main.less';

.dialog
{
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 4;
    display: flex;
    align-items: center;
    justify-content: center;

    &.hidden
    {
        .modal
        {
            transform: scale(0.8)
        }
    }

    .background
    {
        width: 100%;
        height: 100%;
        background-color: #0000009c;
    }

    .modal
    {
        transform: scale(1);
        transition: transform 0.2s cubic-bezier(0.6, 0.13, 0.29, 1.53);
        position: fixed;
        background-color: var(--theme-content-background-color);
        width: 90vw;
        border-radius: 8px;
        box-shadow: 0px 0px 2px 1px #0000002e;

        .OnTablet({ width: 65vw; });
        .OnDesktop({ width: 35vw; });
        .OnLarge({ width: 30vw; });

        @padding: 13px 17px;

        .title
        {
            border-radius: inherit;
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
            background-color: var(--theme-border-color-mega-light);
            border-bottom: 1px solid var(--theme-border-color);
            padding: @padding;
            font-size: 17px;

            .OnDesktop({
                padding-top: 17px;
                padding-bottom: 17px;
                font-size: 22px;
            });
        }

        .content
        {
            max-height: 70vh;
            overflow: auto;
            font-size: 16px;
            white-space: pre-line;
            padding: @padding;
            padding-top: 10px;
            padding-bottom: 10px;

            .OnDesktop({
                padding-top: 15px;
                padding-bottom: 15px;
            });
            .OnLarge({
                padding-bottom: 40px;
            });
        }

        .buttons
        {
            display: flex;
            flex-direction: row;
            border-top: 1px solid var(--theme-border-color);
            border-radius: inherit;
            border-top-left-radius: 0;
            border-top-right-radius: 0;


            .dialog-button
            {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                font-weight: 500;
                border-left: 1px solid var(--theme-border-color-strong);
                cursor: pointer;
                color: var(--theme-text-color-light);
                min-height: 50px;
                background-color: var(--theme-border-color-mega-light);
                border-radius: inherit;
                border-top-left-radius: 0;
                border-top-right-radius: 0;

                .OnDesktop({ min-height: 60px });

                &:first-of-type
                {
                    border-bottom-right-radius: 0;
                }
                &:last-of-type
                {
                    border-bottom-left-radius: 0;
                }
                &:only-of-type
                {
                    border-bottom-right-radius: inherit;
                    border-bottom-left-radius: inherit;
                }

                &:hover
                {
                    background-color: var(--theme-border-color-extra-light);
                }

                &:first-of-type
                {
                    border-left: none;
                }

                &.danger
                {
                    color: red;
                }
            }
        }
    }
}
</style>