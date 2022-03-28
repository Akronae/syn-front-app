<script>
import CircleSpinner from '@/components/CircleSpinner'
import StringUtils from '@/utils/StringUtils'

export default
{
    name: 'Button',

    props:
    {
        text: { default: '' },
        type: { default: 'primary' },
        isLoading: { default: false },
        icon: { default: null },
        disabled: { type: Boolean, default: false },
        outlined: { type: Boolean, default: false },
        hasShadow: { type: Boolean, default: false },
        iconOnRight: { type: Boolean, default: false },
        size: { type: String, default: 'normal' }
    },

    created ()
    {
    },

    render () 
    {
        const hasText = !StringUtils.isEmptyString(this.text)
        const icon = this.icon && !this.showSpinner &&
        (
            <inline-svg src={this.icon} class={`icon ${!hasText ? 'has-no-text' : ''} ${this.iconOnRight ? 'on-right' : ''}`} />
        )

        return (
            <button class={`button ${this.type}-type size-${this.size} ${this.outlined ? 'outlined' : ''} ${this.hasShadow ? 'has-shadow' : ''}
                ${this.showSpinner ? 'has-spinner' : ''}`} disabled={this.disabled} type={this.type} on-click={this.onClick}>
                { !this.iconOnRight && icon }
                <CircleSpinner ref='spinner' class='spinner' />
                <p class='button-text' v-show={hasText}>{ this.text }</p>
                { this.iconOnRight && icon }
            </button>
        )
    },

    mounted ()
    {
        this.showSpinner = this.isLoading
    },

    data () 
    {
        return {
            showSpinner: null,
            spinnerLastTimeShown: null
        }
    },

    watch:
    {
        isLoading (val)
        {
            this.showSpinner = val
        },

        showSpinner ()
        {
            // if (!this.showSpinner && this.spinnerLastTimeShown)
            // {
            //     const shownSince = Date.now() - this.spinnerLastTimeShown
            //     if (shownSince < 500) this.showSpinner = true
                
            //     return setTimeout(() => this.showSpinner = false, 510)
            // } 

            const spinner = this.$refs.spinner
            const fill = spinner.fill

            spinner.fill = 'transparent'
            setTimeout(() =>
            {
                spinner.fill = fill
            }, 10)

            // if (this.showSpinner) this.spinnerLastTimeShown = Date.now()
        }
    },

    computed:
    {
    },

    methods:
    {
        onClick (event)
        {
            if (this.showSpinner) return
            
            this.$emit('click', event, this)
        },

        async showSpinnerWhile (action)
        {
            this.showSpinner = true
            try
            {
                await action()
            }
            catch (e)
            {
                throw e
            }
            finally
            {
                this.showSpinner = false
            }
        }
    },

    components:
    {
        CircleSpinner
    }
}
</script>

<style lang='less'>
@import '~@/styles/main.less';

.button
{
    cursor: pointer;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: auto;
    border-radius: 4px;
    transition: all .10s ease-out;
    fill: var(--theme-text-color-light);
    .OnDesktop({
        font-size: 1.7vh;
    });
    .OnLarge({
        font-size: 1.5vh;
    });

    &.size-normal
    {
        padding: 15px 10px;

        .OnTablet({
            padding: 1.5vw 2vw;
        });

        .OnDesktop({
            padding: 1.3vh 12px;
        });
    }
    &.size-small
    {
        padding: 15px 
    }
    &.size-large
    {
        padding: 15px 30px;
        font-size: 40px;
        font-weight: bold;
        border-radius: 10px;
        box-shadow: 0 2px 12px 1px #0000007d;
    }

    &.primary-type
    {
        background-color: var(--theme-accent-color-light);
        color: white;
        fill: white;

        &:hover
        {   
            border-color: transparent;

            &.has-no-border
            {
                background-color: var(--theme-accent-color);
            }
        }

        &:active
        {
            background-color: var(--theme-accent-color-dark);
        }

        &.has-shadow
        {
            border-bottom-color: rgba(0, 0, 0, .05);
            border-bottom-width: 6px;
        }

        &.outlined
        {
            background-color: transparent;
            border: 1px solid var(--theme-accent-color);
            color: var(--theme-accent-color);
            fill: var(--theme-accent-color-text);

            &:hover, &:active
            {
                border-color: var(--theme-accent-color-light);
            }

            .spinner
            {
                fill: var(--theme-accent-color-text);
            }
        }

        .spinner
        {
            fill: white;
        }
    }

    &.secondary-type
    {
        background-color: var(--theme-content-background-color);
        color: var(--theme-accent-color-text);
        fill: var(--theme-accent-color-light-50-percent);
        
        &::before, &::after
        {
            display: block;
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0px;
            top: 0px;
            border-radius: inherit;
            content: "";
        }
        &::before
        {
            box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 2px 0px;
        }
        &::after
        {
            box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
        }

        &:hover
        {
            background-color: var(--theme-accent-color-light);
            color: white;
            fill: white;
        }

        &:active
        {
            background-color: var(--theme-accent-color-dark);
        }

        &.outlined
        {
            background-color: transparent;
            border: 1px solid var(--theme-border-color-strong);
            color: var(--theme-text-color);
            fill: var(--theme-text-color-light);
            box-shadow: 0px 1px 2px 0px #0000000a;

            &:hover
            {
                border-color: var(--theme-border-color-extra-strong);
            }

            &:active
            {
                border-color: var(--theme-accent-color);
            }
        }
    }

    &.light-type
    {
        color: var(--theme-text-color);
        border-color: transparent;
        background-color: var(--theme-border-color-light);

        &:hover
        {
            background-color: var(--theme-border-color);
        }

        &.outlined
        {
            background-color: transparent;
            border: 1px solid var(--theme-border-color-light);

            &:hover
            {
                border-color: var(--theme-border-color-strong);
            }
        }
    }

    &.danger-type
    {
        background-color: var(--theme-danger-color);
        fill: white;
        color: white;
        
        &.outlined
        {
            background-color: transparent;
            border: 1px solid var(--theme-danger-color);
            color: var(--theme-danger-color);

            .spinner
            {
                fill: var(--theme-danger-color);
            }
        }

        .spinner
        {
            fill: white;
        }
    }

    &.text-type
    {
        padding: 0;
        margin: 0;
        color: var(--theme-accent-color);
        fill: var(--theme-accent-color-light-30-percent);
        background-color: inherit;
        font-size: inherit;

        & .button-text
        {
            font-size: inherit;
        }

        & .icon
        {
            margin-right: 10px;
        }
    }

    &.has-no-border
    {
        border-color: transparent;
    }

    &.has-spinner
    {
        .button-text
        {
            color: transparent;
            transition: color 0s linear;
        }

        > .spinner
        {
            opacity: 1;
            transition: opacity 0.2s linear;
        }
    }

    &:disabled
    {
        color: var(--theme-text-color-extra-light);
        fill: var(--theme-text-color-extra-light);
        background-color: var(--theme-border-color-mega-light);
        cursor: not-allowed;
    }

    .spinner
    {
        fill: var(--theme-text-color-light);
    }

    .button-text
    {
        color: inherit;
        font-size: inherit;
        text-shadow: inherit;
        margin-top: auto;
        margin-bottom: auto;
    }

    .icon
    {
        @margin: 15px;

        height: 3.5vw;
        margin-right: @margin;
        width: auto;
        fill: inherit;

        .OnTablet({
            height: 2.5vw;
        });

        .OnDesktop({
            height: 0.6vw;
        });

        &.has-no-text
        {
            margin-left: auto;
            margin-right: auto;
        }

        &.on-right
        {
            margin-right: 0;
            margin-left: @margin;
        }
    }

    > .spinner
    {
        height: 16px;
        width: 16px;
        transition: opacity 0s linear;
        position: absolute;
        opacity: 0;

        &[style*='opacity: 0;']
        {
            pointer-events: none;
        }
    }
}
</style>