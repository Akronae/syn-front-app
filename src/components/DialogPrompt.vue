<script>
import Dialog from '@/components/Dialog'
import FloatingLabelTextInput from '@/components/FloatingLabelTextInput'

export default
{
    name: 'dialog-prompt',

    props:
    {
        title: { type: String, default: '' },
        placeholder: { type: String },
        buttons: { type: Array },
        promptAutoComplete: { type: Array }
    },

    created ()
    {
    },

    render () 
    {
        return (
            <Dialog class='dialog-prompt' title={this.title} buttons={this.buttons}>
                <FloatingLabelTextInput placeholder={this.placeholder} v-model={this.promptValue} autocomplete={this.promptAutoComplete} />
            </Dialog>
        )
    },

    mounted ()
    {
    },

    data () 
    {
        return {
            promptValue: ''
        }
    },

    computed:
    {
    },

    methods:
    {
    },

    components:
    {
        Dialog,
        FloatingLabelTextInput
    }
}
</script>

<style lang='less'>
.dialog-prompt
{
}
</style>