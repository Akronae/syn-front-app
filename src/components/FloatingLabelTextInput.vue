<script>
import StringUtils from '@/utils/StringUtils'
import EventsUtils from '@/utils/eventsUtils'
import MathUtils from '@/utils/mathUtils'
import TouchUtils from '@/utils/touchUtils'
import InputUtils from '@/utils/inputUtils'

const REF_FIELD_WRAPPER = 'field-wrapper'
const REF_INPUT = 'input'
const REF_LEFT_BORDER = 'left-border'
const REF_RIGHT_BORDER = 'right-border'
const REF_BOTTOM_BORDER = 'bottom-border'
const REF_PLACEHOLDER = ''
const REF_INPUT_HINT_MESSAGE = 'input-hint-message'

export default
{
    name: 'floating-label-text-input',

    props:
    {
        placeholder: { type: String, default: '' },
        transitionDuration: { type: String, default: '150ms' },
        type: { type: String, default: 'text' },
        icon: { type: String, default: '' },
        hintMessage: { type: String, default: '' },
        autocapitalize: { type: String, default: '' },
        placeholderDisappearOnText: { type: Boolean },
        autocomplete: { type: Array },
        disabled: { type: Boolean, default: false },
        autofocus: { type: Boolean },
        
        // bound to v-model.
        value: { default: '' },

        /** @values not-empty, email, phone */
        validation: { type: String },
        validationHint: { type: String },
        optional: { type: Boolean, default: false },

        // sometimes v-show does not work... weird.
        show: { default: true }
    },

    created ()
    {
        this.inputText = this.value || ''
        window.addEventListener('resize', this.onWindowResize)
    },

    render () 
    {
        return (
            <div class={`floating-label-text-input ${this.disabled ? 'disabled' : ''}`} v-show={this.show}>
                <div class='field-wrapper' ref={REF_FIELD_WRAPPER}>
                    <form onsubmit='return false'>
                        <input ref={REF_INPUT} style={{ width: this.inputWidth }} autocomplete='off' autofill='off' autocapitalize={this.autocapitalize}
                            disabled={this.disabled} on-keydown={this.onKeyDown} value={this.inputText} on-change={this.onInput} on-input={this.onInput} on-focus={this.onInputFocus} on-blur={this.onInputBlur} />
                    </form>
                    <div class='border no-right' ref={REF_LEFT_BORDER} />
                    <div class='field-placeholder' ref={REF_PLACEHOLDER} style={{ transitionDuration: this.transitionDuration }} >
                        <span>{ this.placeholderText }</span>
                    </div>
                    <inline-svg src={this.icon} class='field-icon' />
                    <div class='border no-left' ref={REF_RIGHT_BORDER} />
                    <div class='border bottom' ref={REF_BOTTOM_BORDER} />
                </div>
                <div ref={REF_INPUT_HINT_MESSAGE} class='input-hint-message'>{ this.inputHintMessage }</div>
                <div style={{ display: 'inline-block' }} />
                <div class='autocomplete' v-show={this.showAutocomplete} ref='autocomplete'>
                    {
                        this.autocomplete && this.autocompleteShowed.map(val => 
                            <div class={`item ${this.autocompleteSelectedItem == val ? 'selected' : ''}`} on-click={() => this.onAutocompleteItemClicked(val)}>{val}</div>
                        )
                    }
                </div>
            </div>
        )
    },

    mounted ()
    {
        this.hideHintMessage()
        this.input.type = this.type
        this.setHintMessage(this.hintMessage)
        this.onWindowResize()

        const observer = new IntersectionObserver((entries, observer) =>
        {
            entries.forEach(entry =>
            {
                if (entry.intersectionRatio > 0)
                {
                    setTimeout(this.onWindowResize, 100)
                }
            })
        }, { root: document.documentElement });

        observer.observe(this.$el);

        if (this.autofocus) this.input.focus()
    },

    beforeDestroy ()
    {
        window.removeEventListener('resize', this.onWindowResize)
    },

    data () 
    {
        return {
            inputHintMessage: '',
            marginBottom: null,
            inputText: '',
            showAutocomplete: false,
            autocompleteSelectedItem: null
        }
    },

    watch:
    {
        value: function (val, oldVal)
        {
            this.inputText = val || ''
        },

        inputText: function (val, oldVal)
        {
            this.hideHintMessage()

            this.$emit('input', this.inputText)

            val = val.toString()
            oldVal = oldVal.toString()

            const isValEmpty = StringUtils.isEmptyString(val)
            const isOldValEmpty = StringUtils.isEmptyString(oldVal)

            if (isValEmpty == isOldValEmpty) return

            if (isValEmpty)
            {
                // ensure that text has been empty for longer than 50ms:
                // when keyboard word suggestion is selected, text is emptied & replaced.
                setTimeout(() =>
                {
                    if (!StringUtils.isEmptyString(this.inputText)) return

                    this.onInputEmpty()
                }, 50)
            }

            else this.onInputHasText()
        },

        autocompleteSelectedItem ()
        {
            if (this.autocompleteSelectedItem)
            {
                const selected = this.$refs.autocomplete.querySelector('.item.selected')
                if (selected) this.$refs.autocomplete.scrollTo(0, selected.offsetTop - this.$refs.autocomplete.getBoundingClientRect().height / 2)
            }
        },
    },

    computed:
    {
        placeholderText ()
        {
            var val = this.placeholder

            if (this.optional && StringUtils.isEmptyString(this.inputText))
            {
                val += ' (optionnel)'
            }

            return val
        },

        autocompleteShowed ()
        {
            if (!this.autocomplete || !Array.isArray(this.autocomplete)) return []

            console.log(this.autocomplete)

            return this.autocomplete.filter(val => 
                            StringUtils.removeAccents((val || '').toLowerCase()).includes(StringUtils.removeAccents(this.inputText.toLowerCase())) 
                            && val != this.inputText)
        },

        inputWidth ()
        {
            return StringUtils.isEmptyString(this.icon) ? '90%' : '75%'
        },

        fieldWrapper ()
        {
            return this.$refs[REF_FIELD_WRAPPER]
        },

        input ()
        {
            return this.$refs[REF_INPUT]
        },

        placeholderElem ()
        {
            return this.$refs[REF_PLACEHOLDER]
        },

        leftBorder ()
        {
            return this.$refs[REF_LEFT_BORDER]
        },

        rightBorder ()
        {
            return this.$refs[REF_RIGHT_BORDER]
        },

        bottomBorder ()
        {
            return this.$refs[REF_BOTTOM_BORDER]
        },

        inputHint ()
        {
            return this.$refs[REF_INPUT_HINT_MESSAGE]
        }
    },

    methods:
    {
        isInputFocused ()
        {
            return window.document.activeElement == this.input
        },

        getInputFontSize ()
        {
            return window.getComputedStyle(this.input).fontSize
        },

        blur ()
        {
            this.input.blur()
        },

        setActiveStyle ()
        {
            this.$el.classList.add('active')
            this.$el.classList.remove('error')
        },

        setInactiveStyle ()
        {
            this.$el.classList.remove('active')
            this.$el.classList.remove('error')
        },

        setErrorStyle ()
        {
            this.$el.classList.add('error')
        },

        showHintMessage ()
        {
            const isHintMessageAlreadyShown = this.inputHint.style.display != 'none'
            if (isHintMessageAlreadyShown) return

            this.inputHint.style.display = 'inherit'
            this.marginBottom = this.$el.style.marginBottom

            this.$nextTick(() =>
            {
                this.$el.style.marginBottom = this.inputHint.clientHeight + 'px'
            })
        },

        hideHintMessage ()
        {
            this.inputHint.style.display = 'none'
            this.$el.style.marginBottom = this.marginBottom
        },

        setHintMessage (value)
        {
            this.inputHintMessage = value

            if (StringUtils.isEmptyString(this.inputHintMessage)) this.hideHintMessage()
            else this.showHintMessage()
        },

        setErrorMessage (message)
        {
            this.setHintMessage(message)
            this.setErrorStyle()
        },

        onWindowResize (event)
        {
            if (this.isInputFocused())
            {
                this.onInputFocus(event)
            }
            else
            {
                this.onInputBlur()
            }
            
            if (!StringUtils.isEmptyString(this.inputText))
            {
                this.onInputEmpty()
                this.onInputHasText(true)
            }
            else
            {
                this.onInputEmpty()
            }
        },

        onKeyDown (event)
        {
            switch (event.keyCode)
            {
                case InputUtils.KEYCODES.ENTER:
                    this.onEnterPressed()
                    break
                case InputUtils.KEYCODES.ARROW_UP:
                    this.autocompleteSelectNextItem(-1)
                    break
                case InputUtils.KEYCODES.ARROW_DOWN:
                    this.autocompleteSelectNextItem(1)
                    break
            }
        },

        onEnterPressed ()
        {
            if (this.autocompleteSelectedItem) this.inputText = this.autocompleteSelectedItem
            this.$emit('enter')
        },

        onInput (event)
        {
            this.inputText = event.target.value
        },

        onInputFocus (event)
        {
            this.$emit('focus')

            this.setActiveStyle()

            this.hideHintMessage()

            this.showAutocomplete = true
            this.$refs.autocomplete.style.width = this.$el.getBoundingClientRect().width + 'px'

        },

        onInputBlur (event)
        {
            this.$emit('blur')
            
            this.setInactiveStyle()

            if (this.showAutocomplete && !MathUtils.areRectsColliding(this.$refs.autocomplete.getBoundingClientRect(), MathUtils.rectFromPoint(TouchUtils.mousePos)))
            {
                this.showAutocomplete = false
            }
        },

        onInputHasText (noTransition)
        {
            this.$el.classList.add('has-text')
            if (StringUtils.isEmptyString(this.placeholderText)) return

            if (this.placeholderDisappearOnText) this.placeholderElem.style.opacity = 0
            
            const scaleRatio = 0.75
            const placeholderTopExtraMargin = -0
            var translatedYPos = `calc(-${this.getInputFontSize()} / 2 + ${placeholderTopExtraMargin}px)`
            if (this.placeholderDisappearOnText) translatedYPos = 0
            this.placeholderElem.style.transform = `scale(${scaleRatio}) translateY(${translatedYPos})`
            if (!this.placeholderDisappearOnText) this.placeholderElem.style.top = '0px'

            const transitionDuration = noTransition ? 10 : Number.parseInt(this.transitionDuration)
            
            EventsUtils.setDelayedInterval(() =>
            {
                const placeholderRect = this.placeholderElem.getBoundingClientRect()
                const placeholderRelativePositionX = placeholderRect.x - this.fieldWrapper.getBoundingClientRect().x
                const placeholderRelativePositionEndX = placeholderRelativePositionX + placeholderRect.width
                const placeholderMarginRight = 5

                if (!this.placeholderDisappearOnText)
                {
                    this.leftBorder.style.width = placeholderRelativePositionX + 'px'
                    this.rightBorder.style.width = `calc(100% - ${placeholderRelativePositionEndX}px - ${placeholderMarginRight}px)`
                }
            }, transitionDuration / 2, transitionDuration * (1/3), transitionDuration * 2 + 100);
        },

        onInputEmpty ()
        {
            this.$el.classList.remove('has-text')

            if (this.placeholderDisappearOnText) this.placeholderElem.style.opacity = 1

            const extraMarginTop = 2
            let placeholderHeight
            if (this.placeholderElem.offsetHeight)
            {
                placeholderHeight = this.placeholderElem.offsetHeight + 'px'
            }
            else return setTimeout(this.onInputEmpty, 100)

            this.placeholderElem.style.transform = 'scale(1) translateY(0)'
            this.placeholderElem.style.top = `calc(50% - ${placeholderHeight} / 2 + ${extraMarginTop}px)`

            this.leftBorder.style.width = this.rightBorder.style.width = '50%'
        },

        onAutocompleteItemClicked (val)
        {
            this.inputText = val
            this.showAutocomplete = false
        },

        autocompleteSelectNextItem (offset)
        {
            const showed = this.autocompleteShowed
            if (!this.autocomplete || showed.length < 1) return

            if (!this.autocompleteSelectedItem)
            {
                return this.autocompleteSelectedItem = this.autocompleteShowed[0]
            }

            return this.autocompleteSelectedItem = this.autocompleteShowed[this.autocompleteShowed.indexOf(this.autocompleteSelectedItem) + offset]
        }
    },

    components:
    {
    }
}
</script>

<style lang='less'>
@import '~@/styles/main.less';

@placeholder-padding-side: 10px;
@border-size: 2px;
@border-radius: 4px;

.floating-label-text-input
{
    height: 12vw;
    font-size: 4vw;
    border-color: var(--theme-border-color);
    border-radius: @border-radius;
    color: var(--theme-text-color);
    padding-bottom: @border-size;

    .OnTablet({
        height: 6.5vw;
        font-size: 2.2vw;
    });

    .OnDesktop({
        height: 5vh;
        font-size: 1.7vh;
    });

    &:hover
    {
        border-color: var(--theme-border-color-strong);
    }

    &.active
    {
        border-color: var(--theme-accent-color);
    }

    &.error
    {
        border-color: red;

        .label
        {
            color: red;
        }

        & .input-hint-message
        {
            color: red;
        }
    }

    &.disabled
    {
        background-color: var(--theme-border-color-mega-light);
        border-color: var(--theme-border-color-mega-light);
    }

    &.light-gray-style
    {
        background-color: var(--theme-search-bar-gray-background);
        border-color: transparent;
        transition: background-color .250s;

        &.active
        {
            background-color: var(--theme-content-background-color);
            box-shadow: var(--theme-box-shadow-sharp);
        }
    }

    .field-wrapper
    {
        position: relative;
        margin-bottom: @border-size * 2;
        display: flex;
        flex-direction: row;
        margin-bottom: -15px;
        height: inherit;
        border-color: inherit;
        color: inherit;

        input
        {
            position: absolute;
            background-color: transparent;
            margin-left: @placeholder-padding-side * 2;
            margin-right: @placeholder-padding-side * 2;
            height: 100%;  
            margin-top: auto;
            margin-bottom: auto;
            top: @border-size;
            font-size: inherit;
            color: inherit;
        }

        .field-placeholder
        {
            pointer-events: none;
            box-sizing: border-box;
            padding: 0 8px;
            position: absolute;
            transition: transform cubic-bezier(0.4,0,0.2,1), opacity cubic-bezier(0.4,0,0.2,1);
            z-index: 1;
            text-align: left;
            color: #ADB4BF;

            span
            {
                padding-left: @placeholder-padding-side;
            }
        }

        .border
        {
            border: @border-size solid;
            border-color: inherit;
            border-radius: @border-radius;
            position: absolute;
            height: 100%;
            pointer-events: none;
            transition: border-color .10s ease-out;

            &.no-right
            {
                border-top-right-radius: 0; 
                border-bottom-right-radius: 0; 
                border-right: none;
                left: 0;
            }

            &.no-left
            {
                border-top-left-radius: 0; 
                border-bottom-left-radius: 0; 
                border-left: none;
                right: 0;
            }

            &.bottom
            {
                border-top: none;
                border-left: none;
                border-right: none;
                border-radius: 0;
                left: 1%;
                width: 98%;
                bottom: -@border-size * 2;
            }
        }

        .field-icon
        {
            position: absolute;
            height: 50%;
            top: calc(25% + @border-size);
            right: @border-size * 6;
            fill: #ADB4BF;
        }
    }

    .input-hint-message
    {
        font-size: 2vh;
        padding-top: @placeholder-padding-side * 2 + @border-size * 2;
        margin-bottom: -@placeholder-padding-side * 2;
        margin-left: 5px;
        display: inline-block;

        .OnLargeMobile({ font-size: 1.7vh; });
        .OnTablet({ font-size: 1.5vh; });
        .OnDesktop({ font-size: inherit; });
    }

    .autocomplete
    {
        position: relative;
        top: 5px;
        display: flex;
        flex-direction: column;
        background-color: var(--theme-content-background-color);
        z-index: 2;
        border-radius: 6px;
        box-shadow: var(--theme-box-shadow-sharp);
        max-height: 30vh;
        overflow-y: auto;

        .item
        {
            padding: 10px;
            border-top: 1px solid var(--theme-border-color-light);
            font-size: 93%;
            cursor: pointer;

            &:first-of-type
            {
                border-top: none;
                border-radius: inherit;
                border-bottom-left-radius: 0;
                border-bottom-right-radius: 0;
            }

            &:last-of-type
            {
                border-radius: inherit;
                border-top-left-radius: 0;
                border-top-right-radius: 0;
            }

            &:hover, &.selected
            {
                background-color: var(--theme-border-color-mega-light);
            }
        }
    }
}
</style>