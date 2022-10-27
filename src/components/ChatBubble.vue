<script>
import Button from '@/components/Button'
import VueUtils from '@/utils/vueUtils'
import DOMUtils from '@/utils/DOMUtils'

export default
{
    name: 'chat-bubble',

    props:
    {
        message: { type: String, required: true },
        buttons: { type: Array, default: () => ([]) },
        showCloseButton: { type: Boolean, default: true },
        closeOnClick: { type: Boolean, default: true }
    },

    created ()
    {
    },

    render () 
    {
        return (
            <div class='chat-bubble'>
                <div class='screen-filter' on-click={this.onScreenFilterClicked} />
                <div class='bubble'>
                    <div class='corner' />
                    <p class='message'>{ this.message }</p>
                </div>
                <div class='speaker'>
                    <img src={require('@/assets/img/cat.svg')} />
                </div>
                <div class='actions'>
                {
                    this.buttons.map(button =>
                    {
                        return <Button type={button.type || 'secondary'} text={button.label} on-click={e => (button.action || this.close)(e, this)} />
                    })
                }
                    <Button v-show={this.showCloseButton} type='secondary' text='Fermer cette bulle' on-click={this.close} />
                </div>
            </div>
        )
    },

    mounted ()
    {
        this.open()
    },

    data () 
    {
        return {
        }
    },

    computed:
    {
    },

    beforeDestroy ()
    {
        DOMUtils.toggleBodyScrolling(true)
    },

    methods:
    {
        onScreenFilterClicked ()
        {
            if (this.closeOnClick)
            {
                this.close()
            }
        },

        open ()
        {
            this.$el.classList.add('not-yet-rendered')
            setTimeout(() => this.$el.classList.remove('not-yet-rendered'), 10)
            DOMUtils.toggleBodyScrolling(false)
        },

        close ()
        {
            this.$el.classList.add('not-yet-rendered')
            setTimeout(() => VueUtils.destroyInstance(this), 100)
            DOMUtils.toggleBodyScrolling(true)
        }
    },

    components:
    {
        Button
    }
}
</script>

<style lang='less'>
@import '~@/styles/main.less';

.chat-bubble
{
    position: fixed;
    height: 100vh;
    width: 100vw;
    z-index: 3;

    &.not-yet-rendered
    {
        .bubble
        {
            transform: scale(0.8)
        }

        .speaker
        {
            transform: rotate(0deg);
            right: -35vw;
        }

        .button
        {
            transform: scale(0.9);
        }
    }

    .screen-filter
    {
        position: fixed;
        z-index: -1;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
        background-color: #00000030;
        cursor: pointer;
    }

    .bubble
    {
        position: absolute;
        width: 65vw;
        background-color: var(--theme-content-background-color);
        border-radius: 30px;
        box-shadow: 0 0 10px 5px #00000020;
        pointer-events: none;
        transition: all 0.2s;
        left: 3vw;
        top: 26vh;

        .OnDesktop({
            left: calc(var(--theme-vertical-menu-width) + 6vw);
            top: 30vh;
        });

        .message
        {
            position: relative;
            padding: 7% 8%;
            font-size: 2.5vh;
            font-weight: 500;
            line-height: 1.5;
            white-space: pre-line;

            .OnDesktop({
                padding: 5% 6%;
                font-size: 2vh;
            });
        }
    }

    .corner
    {
        position: absolute;
        background-color: var(--theme-content-background-color);
        width: 60px;
        height: 35%;
        bottom: 20px;
        border-radius: 10px;
        right: -10px;
        transform: rotate(45deg);

        .OnDesktop({
            width: 70px;
            height: 45%;
            bottom: 25px;
        });
    }

    .speaker
    {
        position: fixed;
        transform: rotate(-45deg);
        bottom: 45vh;
        pointer-events: none;
        transition: all 0.2s;
        width: 35vw;
        right: -12vw;

        .OnDesktop({
            width: 15vw;
            right: -5vw;
        });

        img
        {
            width: 100%;
            height: 100%;
        }
    }

    .actions
    {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        bottom: calc(var(--theme-horizontal-menu-height) + 3vh);

        .OnDesktop({ flex-direction: row; });

        .button
        {
            margin-top: 1.5vh;
            width: 90%;
            border-radius: 8px;
            
            .OnDesktop({
                width: 25%;
                margin: 1.5vh;
            });
            .OnLarge({
                width: 20%;
            });
        }
    }
}
</style>