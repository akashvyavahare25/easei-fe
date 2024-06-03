export const formioOptions = {
    noDefaultSubmitButton: true,
    builder: {
        advanced: false,
        layout: false,
        data: false,
        premium: false,
        basic: {
            title: 'Parameters',
            components: {
                button: false,
                selectboxes: false,
                textfield: true,
                textarea: true,
                number: true,
                password: true,
                checkbox: true,
                select: true,
                radio: true,
                datamap: true,
                datagrid: true,
                file: true,
                datetime: true
            }
        },
    },
    editForm: {
        datagrid: [
            {
                key: 'layout',
                ignore: true
            },
            {
                key: 'conditional',
                ignore: false
            },
        ],
        datetime: [
            {
                key: 'layout',
                ignore: true
            },
            {
                key: 'conditional',
                ignore: false
            },
        ],
        file: [
            {
                key: 'layout',
                ignore: true
            },
            {
                key: 'conditional',
                ignore: false
            },
        ],
        datamap: [
            {
                key: 'layout',
                ignore: true
            },
            {
                key: 'conditional',
                ignore: false
            },
        ],
        textfield: [
            {
                key: 'layout',
                ignore: true
            },
            {
                key: 'validation',
                ignore: false,
                components: [
                    {
                        key: 'validate.minWords',
                        ignore: true
                    },
                    {
                        key: 'validate.maxWords',
                        ignore: true
                    }
                ]
            },
            {
                key: 'conditional',
                ignore: false
            },
            {
                key: 'display',
                label: 'Basic',
                components: [
                    {
                        key: 'labelPosition',
                        ignore: true
                    },
                    {
                        key: 'labelMargin',
                        ignore: true
                    },
                    {
                        key: 'tooltip',
                        ignore: true
                    },
                    {
                        key: 'labelWidth',
                        ignore: true
                    },
                    {
                        key: 'widget.type',
                        ignore: true
                    },
                    {
                        key: 'inputMask',
                        ignore: true
                    },
                    {
                        key: 'allowMultipleMasks',
                        ignore: true
                    },
                    {
                        key: 'prefix',
                        ignore: true
                    },
                    {
                        key: 'suffix',
                        ignore: true
                    },
                    {
                        key: 'customClass',
                        ignore: true
                    },
                    {
                        key: 'tabindex',
                        ignore: true
                    },
                    {
                        key: 'persistent',
                        ignore: true
                    },
                    {
                        key: 'multiple',
                        ignore: true
                    },
                    {
                        key: 'clearOnHide',
                        ignore: true
                    },
                    {
                        key: 'protected',
                        ignore: true
                    },
                    {
                        key: 'hidden',
                        ignore: true
                    },
                    {
                        key: 'mask',
                        ignore: true
                    },
                    {
                        key: 'disabled',
                        ignore: true
                    },
                    {
                        key: 'autofocus',
                        ignore: true
                    },
                    {
                        key: 'tableView',
                        ignore: true
                    },
                    {
                        key: 'alwaysEnabled',
                        ignore: true
                    },
                    {
                        key: 'showWordCount',
                        ignore: true
                    },
                    {
                        key: 'showCharCount',
                        ignore: true
                    }
                ]
            },
            {
                key: 'Advanced',
                label: 'Advanced',
                ignore: true,
                components: [
                    {
                        key: 'widget.type',
                        input: true,
                        label: 'Widget',
                        type: 'select'
                    },
                    {
                        key: 'inputMask',
                        input: true,
                        label: 'Input Mask',
                        placeholder: 'Input Mask',
                        type: 'textfield'
                    },
                    {
                        key: 'allowMultipleMasks',
                        input: true,
                        label: 'Allow Multiple Masks',
                        type: 'checkbox'
                    },
                    {
                        key: 'prefix',
                        input: true,
                        label: 'Prefix',
                        placeholder: 'Prefix',
                        type: 'textfield'
                    },
                    {
                        key: 'suffix',
                        input: true,
                        label: 'Suffix',
                        placeholder: 'Suffix',
                        type: 'textfield'
                    },
                    {
                        key: 'customClass',
                        input: true,
                        label: 'Custom Class',
                        placeholder: 'Custom CSS Class',
                        type: 'textfield'
                    },
                    {
                        key: 'tabindex',
                        input: true,
                        label: 'Tab Index',
                        placeholder: 'Tab Index',
                        type: 'textfield'
                    },
                    {
                        key: 'multiple',
                        input: true,
                        label: 'Multiple Values',
                        type: 'checkbox'
                    },
                    {
                        key: 'clearOnHide',
                        input: true,
                        label: 'Clear Value When Hidden',
                        type: 'checkbox'
                    },
                    {
                        key: 'protected',
                        input: true,
                        label: 'Protected',
                        type: 'checkbox'
                    },
                    {
                        key: 'hidden',
                        input: true,
                        label: 'Hidden',
                        type: 'checkbox'
                    },
                    {
                        key: 'mask',
                        input: true,
                        label: 'Hide Input',
                        type: 'checkbox'
                    },
                    {
                        key: 'disabled',
                        input: true,
                        label: 'Disabled',
                        type: 'checkbox'
                    },
                    {
                        key: 'autofocus',
                        input: true,
                        label: 'Initial Focus',
                        type: 'checkbox'
                    },
                    {
                        key: 'tableView',
                        input: true,
                        label: 'Table View',
                        type: 'checkbox'
                    },
                    {
                        key: 'alwaysEnabled',
                        input: true,
                        label: 'Always Enabled',
                        type: 'checkbox'
                    }
                ]
            }
        ],
        number: [
            {
                key: 'layout',
                ignore: true
            },
            {
                key: 'display',
                label: 'Basic',
                components: [
                    {
                        key: 'labelMargin',
                        ignore: true
                    },
                    {
                        key: 'tooltip',
                        ignore: true
                    },
                    {
                        key: 'labelWidth',
                        ignore: true
                    },
                    {
                        key: 'customClass',
                        ignore: true
                    },
                    {
                        key: 'tabindex',
                        ignore: true
                    },
                    {
                        key: 'persistent',
                        ignore: true
                    },
                    {
                        key: 'multiple',
                        ignore: true
                    },
                    {
                        key: 'clearOnHide',
                        ignore: true
                    },
                    {
                        key: 'protected',
                        ignore: true
                    },
                    {
                        key: 'hidden',
                        ignore: true
                    },
                    {
                        key: 'mask',
                        ignore: true
                    },
                    {
                        key: 'disabled',
                        ignore: true
                    },
                    {
                        key: 'autofocus',
                        ignore: true
                    },
                    {
                        key: 'tableView',
                        ignore: true
                    },
                    {
                        key: 'alwaysEnabled',
                        ignore: true
                    }
                ]
            },
            {
                key: 'conditional',
                ignore: false
            },
            {
                key: 'Advanced',
                label: 'Advanced',
                ignore: true,
                components: [
                    {
                        key: 'customClass',
                        input: true,
                        label: 'Custom Class',
                        placeholder: 'Custom CSS Class',
                        type: 'textfield'
                    },
                    {
                        key: 'tabindex',
                        input: true,
                        label: 'Tab Index',
                        placeholder: 'Tab Index',
                        type: 'textfield'
                    },
                    {
                        key: 'multiple',
                        input: true,
                        label: 'Multiple Values',
                        type: 'checkbox'
                    },
                    {
                        key: 'clearOnHide',
                        input: true,
                        label: 'Clear Value When Hidden',
                        type: 'checkbox'
                    },
                    {
                        key: 'protected',
                        input: true,
                        label: 'Protected',
                        type: 'checkbox'
                    },
                    {
                        key: 'hidden',
                        input: true,
                        label: 'Hidden',
                        type: 'checkbox'
                    },
                    {
                        key: 'mask',
                        input: true,
                        label: 'Hide Input',
                        type: 'checkbox'
                    },
                    {
                        key: 'disabled',
                        input: true,
                        label: 'Disabled',
                        type: 'checkbox'
                    },
                    {
                        key: 'autofocus',
                        input: true,
                        label: 'Initial Focus',
                        type: 'checkbox'
                    },
                    {
                        key: 'tableView',
                        input: true,
                        label: 'Table View',
                        type: 'checkbox'
                    },
                    {
                        key: 'alwaysEnabled',
                        input: true,
                        label: 'Always Enabled',
                        type: 'checkbox'
                    }
                ]
            }
        ],
        password: [
            {
                key: 'layout',
                ignore: true
            },
            {
                key: 'conditional',
                ignore: false
            },
            {
                key: 'display',
                label: 'Basic',
                components: [
                    {
                        key: 'labelMargin',
                        ignore: true
                    },
                    {
                        key: 'tooltip',
                        ignore: true
                    },
                    {
                        key: 'labelWidth',
                        ignore: true
                    },
                    {
                        key: 'prefix',
                        ignore: true
                    },
                    {
                        key: 'suffix',
                        ignore: true
                    },
                    {
                        key: 'customClass',
                        ignore: true
                    },
                    {
                        key: 'tabindex',
                        ignore: true
                    },
                    {
                        key: 'persistent',
                        ignore: true
                    },
                    {
                        key: 'showWordCount',
                        ignore: true
                    },
                    {
                        key: 'multiple',
                        ignore: true
                    },
                    {
                        key: 'clearOnHide',
                        ignore: true
                    },
                    {
                        key: 'protected',
                        ignore: true
                    },
                    {
                        key: 'hidden',
                        ignore: true
                    },
                    {
                        key: 'mask',
                        ignore: true
                    },
                    {
                        key: 'disabled',
                        ignore: true
                    },
                    {
                        key: 'autofocus',
                        ignore: true
                    },
                    {
                        key: 'tableView',
                        ignore: true
                    },
                    {
                        key: 'alwaysEnabled',
                        ignore: true
                    }
                ]
            },
            {
                key: 'Advanced',
                label: 'Advanced',
                ignore: true,
                components: [
                    {
                        key: 'prefix',
                        input: true,
                        label: 'Prefix',
                        placeholder: 'Prefix',
                        type: 'textfield'
                    },
                    {
                        key: 'suffix',
                        input: true,
                        label: 'Suffix',
                        placeholder: 'Suffix',
                        type: 'textfield'
                    },
                    {
                        key: 'customClass',
                        input: true,
                        label: 'Custom Class',
                        placeholder: 'Custom CSS Class',
                        type: 'textfield'
                    },
                    {
                        key: 'tabindex',
                        input: true,
                        label: 'Tab Index',
                        placeholder: 'Tab Index',
                        type: 'textfield'
                    },
                    {
                        key: 'multiple',
                        input: true,
                        label: 'Multiple Values',
                        type: 'checkbox'
                    },
                    {
                        key: 'clearOnHide',
                        input: true,
                        label: 'Clear Value When Hidden',
                        type: 'checkbox'
                    },
                    {
                        key: 'protected',
                        input: true,
                        label: 'Protected',
                        type: 'checkbox'
                    },
                    {
                        key: 'hidden',
                        input: true,
                        label: 'Hidden',
                        type: 'checkbox'
                    },
                    {
                        key: 'mask',
                        input: true,
                        label: 'Hide Input',
                        type: 'checkbox'
                    },
                    {
                        key: 'disabled',
                        input: true,
                        label: 'Disabled',
                        type: 'checkbox'
                    },
                    {
                        key: 'autofocus',
                        input: true,
                        label: 'Initial Focus',
                        type: 'checkbox'
                    },
                    {
                        key: 'tableView',
                        input: true,
                        label: 'Table View',
                        type: 'checkbox'
                    },
                    {
                        key: 'alwaysEnabled',
                        input: true,
                        label: 'Always Enabled',
                        type: 'checkbox'
                    }
                ]
            }
        ],
        textarea: [
            {
                key: 'layout',
                ignore: true
            },
            {
                key: 'conditional',
                ignore: false
            },
            {
                key: 'display',
                label: 'Basic',
                components: [
                    {
                        key: 'labelMargin',
                        ignore: true
                    },
                    {
                        key: 'tooltip',
                        ignore: true
                    },
                    {
                        key: 'labelWidth',
                        ignore: true
                    },
                    {
                        key: 'prefix',
                        ignore: true
                    },
                    {
                        key: 'suffix',
                        ignore: true
                    },
                    {
                        key: 'customClass',
                        ignore: true
                    },
                    {
                        key: 'tabindex',
                        ignore: true
                    },
                    {
                        key: 'persistent',
                        ignore: true
                    },
                    {
                        key: 'multiple',
                        ignore: true
                    },
                    {
                        key: 'clearOnHide',
                        ignore: true
                    },
                    {
                        key: 'protected',
                        ignore: true
                    },
                    {
                        key: 'hidden',
                        ignore: true
                    },
                    {
                        key: 'mask',
                        ignore: true
                    },
                    {
                        key: 'disabled',
                        ignore: true
                    },
                    {
                        key: 'autofocus',
                        ignore: true
                    },
                    {
                        key: 'tableView',
                        ignore: true
                    },
                    {
                        key: 'alwaysEnabled',
                        ignore: true
                    }
                ]
            },
            {
                key: 'Advanced',
                label: 'Advanced',
                ignore: true,
                components: [
                    {
                        key: 'prefix',
                        input: true,
                        label: 'Prefix',
                        placeholder: 'Prefix',
                        type: 'textfield'
                    },
                    {
                        key: 'suffix',
                        input: true,
                        label: 'Suffix',
                        placeholder: 'Suffix',
                        type: 'textfield'
                    },
                    {
                        key: 'customClass',
                        input: true,
                        label: 'Custom Class',
                        placeholder: 'Custom CSS Class',
                        type: 'textfield'
                    },
                    {
                        key: 'tabindex',
                        input: true,
                        label: 'Tab Index',
                        placeholder: 'Tab Index',
                        type: 'textfield'
                    },
                    // {
                    //   key: 'persistent',
                    //   input: true,
                    //   label: 'Persistent',
                    //   type: 'radio',
                    // },
                    {
                        key: 'multiple',
                        input: true,
                        label: 'Multiple Values',
                        type: 'checkbox'
                    },
                    {
                        key: 'clearOnHide',
                        input: true,
                        label: 'Clear Value When Hidden',
                        type: 'checkbox'
                    },
                    {
                        key: 'protected',
                        input: true,
                        label: 'Protected',
                        type: 'checkbox'
                    },
                    {
                        key: 'hidden',
                        input: true,
                        label: 'Hidden',
                        type: 'checkbox'
                    },
                    {
                        key: 'mask',
                        input: true,
                        label: 'Hide Input',
                        type: 'checkbox'
                    },
                    {
                        key: 'disabled',
                        input: true,
                        label: 'Disabled',
                        type: 'checkbox'
                    },
                    {
                        key: 'autofocus',
                        input: true,
                        label: 'Initial Focus',
                        type: 'checkbox'
                    },
                    {
                        key: 'tableView',
                        input: true,
                        label: 'Table View',
                        type: 'checkbox'
                    },
                    {
                        key: 'alwaysEnabled',
                        input: true,
                        label: 'Always Enabled',
                        type: 'checkbox'
                    }
                ]
            }
        ],
        checkbox: [
            {
                key: 'layout',
                ignore: true
            },
            {
                key: 'conditional',
                ignore: false
            },
            {
                key: 'display',
                label: 'Basic',
                components: [
                    {
                        key: 'labelWidth',
                        ignore: true
                    },
                    {
                        key: 'tooltip',
                        ignore: true
                    },
                    {
                        key: 'labelMargin',
                        ignore: true
                    },
                    {
                        key: 'placeholder',
                        ignore: true
                    },
                    {
                        key: 'shortcut',
                        ignore: true
                    },
                    {
                        key: 'errorLabel',
                        ignore: true
                    },
                    {
                        key: 'customClass',
                        ignore: true
                    },
                    {
                        key: 'tabindex',
                        ignore: true
                    },
                    {
                        key: 'persistent',
                        ignore: true
                    },
                    {
                        key: 'multiple',
                        ignore: true
                    },
                    {
                        key: 'clearOnHide',
                        ignore: true
                    },
                    {
                        key: 'protected',
                        ignore: true
                    },
                    {
                        key: 'hidden',
                        ignore: true
                    },
                    {
                        key: 'mask',
                        ignore: true
                    },
                    {
                        key: 'disabled',
                        ignore: true
                    },
                    {
                        key: 'autofocus',
                        ignore: true
                    },
                    {
                        key: 'tableView',
                        ignore: true
                    },
                    {
                        key: 'alwaysEnabled',
                        ignore: true
                    }
                ]
            },
            {
                key: 'Advanced',
                label: 'Advanced',
                ignore: true,
                components: [
                    {
                        key: 'labelWidth',
                        input: true,
                        label: 'Label Width',
                        type: 'number'
                    },
                    {
                        key: 'labelMargin',
                        input: true,
                        label: 'Label Margin',
                        type: 'number'
                    },
                    {
                        key: 'placeholder',
                        input: true,
                        label: 'Placeholder',
                        placeholder: 'Placeholder',
                        type: 'textfield'
                    },
                    {
                        key: 'shortcut',
                        input: true,
                        label: 'Shortcut',
                        type: 'select'
                    },
                    {
                        key: 'errorLabel',
                        input: true,
                        label: 'Error Label',
                        placeholder: 'Error Label',
                        type: 'textfield'
                    },
                    {
                        key: 'customClass',
                        input: true,
                        label: 'Custom Class',
                        placeholder: 'Custom Class',
                        type: 'textfield'
                    },
                    {
                        key: 'tabindex',
                        input: true,
                        label: 'Tab Index',
                        placeholder: 'Tab Index',
                        type: 'textfield'
                    },
                    // {
                    //   key: 'persistent',
                    //   input: true,
                    //   label: 'Persistent',
                    //   type: 'radio',
                    // },
                    {
                        key: 'multiple',
                        input: true,
                        label: 'Multiple Values',
                        type: 'checkbox'
                    },
                    {
                        key: 'clearOnHide',
                        input: true,
                        label: 'Clear Value When Hidden',
                        type: 'checkbox'
                    },
                    {
                        key: 'protected',
                        input: true,
                        label: 'Protected',
                        type: 'checkbox'
                    },
                    {
                        key: 'hidden',
                        input: true,
                        label: 'Hidden',
                        type: 'checkbox'
                    },
                    {
                        key: 'mask',
                        input: true,
                        label: 'Hide Input',
                        type: 'checkbox'
                    },
                    {
                        key: 'disabled',
                        input: true,
                        label: 'Disabled',
                        type: 'checkbox'
                    },
                    {
                        key: 'autofocus',
                        input: true,
                        label: 'Initial Focus',
                        type: 'checkbox'
                    },
                    {
                        key: 'tableView',
                        input: true,
                        label: 'Table View',
                        type: 'checkbox'
                    },
                    {
                        key: 'alwaysEnabled',
                        input: true,
                        label: 'Always Enabled',
                        type: 'checkbox'
                    }
                ]
            }
        ],
        select: [
            {
                key: 'layout',
                ignore: true
            },
            {
                key: 'conditional',
                ignore: false
            },
            {
                key: 'display',
                label: 'Basic',
                components: [
                    {
                        key: 'labelMargin',
                        ignore: true
                    },
                    {
                        key: 'tooltip',
                        ignore: true
                    },
                    {
                        key: 'labelWidth',
                        ignore: true
                    },
                    {
                        key: 'customClass',
                        ignore: true
                    },
                    {
                        key: 'tabindex',
                        ignore: true
                    },
                    {
                        key: 'persistent',
                        ignore: true
                    },
                    {
                        key: 'multiple',
                        ignore: true
                    },
                    {
                        key: 'clearOnHide',
                        ignore: true
                    },
                    {
                        key: 'protected',
                        ignore: true
                    },
                    {
                        key: 'hidden',
                        ignore: true
                    },
                    {
                        key: 'mask',
                        ignore: true
                    },
                    {
                        key: 'disabled',
                        ignore: true
                    },
                    {
                        key: 'autofocus',
                        ignore: true
                    },
                    {
                        key: 'tableView',
                        ignore: true
                    },
                    {
                        key: 'alwaysEnabled',
                        ignore: true
                    }
                ]
            },
            {
                key: 'data',
                label: 'Data',
                components: [
                    {
                        key: 'refreshOn',
                        ignore: false
                    },
                    {
                        key: 'clearOnRefresh',
                        ignore: false
                    },
                    {
                        key: 'allowCalculateOverride',
                        ignore: true
                    },
                    {
                        key: 'encrypted',
                        ignore: true
                    },
                    {
                        key: 'dbIndex',
                        ignore: true
                    },
                    {
                        key: 'customClass',
                        input: true,
                        label: 'Custom Class',
                        placeholder: 'Custom Class',
                        type: 'textfield'
                    },
                    {
                        key: 'tabindex',
                        input: true,
                        label: 'Tab Index',
                        placeholder: 'Tab Index',
                        type: 'textfield'
                    },
                    {
                        key: 'multiple',
                        input: true,
                        label: 'Multiple Values',
                        type: 'checkbox'
                    },
                    {
                        key: 'clearOnHide',
                        input: true,
                        label: 'Clear Value When Hidden',
                        type: 'checkbox'
                    },
                    {
                        key: 'protected',
                        input: true,
                        label: 'Protected',
                        type: 'checkbox'
                    },
                    {
                        key: 'hidden',
                        input: true,
                        label: 'Hidden',
                        type: 'checkbox'
                    },
                    {
                        key: 'mask',
                        input: true,
                        label: 'Hide Input',
                        type: 'checkbox'
                    },
                    {
                        key: 'disabled',
                        input: true,
                        label: 'Disabled',
                        type: 'checkbox'
                    },
                    {
                        key: 'autofocus',
                        input: true,
                        label: 'Initial Focus',
                        type: 'checkbox'
                    },
                    {
                        key: 'tableView',
                        input: true,
                        label: 'Table View',
                        type: 'checkbox'
                    },
                    {
                        key: 'alwaysEnabled',
                        input: true,
                        label: 'Always Enabled',
                        type: 'checkbox'
                    }
                ]
            }
        ],
        radio: [
            {
                key: 'layout',
                ignore: true
            },
            {
                key: 'conditional',
                ignore: false
            },
            {
                key: 'display',
                label: 'Basic',
                components: [
                    {
                        key: 'labelMargin',
                        ignore: true
                    },
                    {
                        key: 'tooltip',
                        ignore: true
                    },
                    {
                        key: 'labelWidth',
                        ignore: true
                    },
                    {
                        key: 'placeholder',
                        ignore: true
                    },
                    {
                        key: 'customClass',
                        ignore: true
                    },
                    {
                        key: 'tabindex',
                        ignore: true
                    },
                    {
                        key: 'persistent',
                        ignore: true
                    },
                    {
                        key: 'clearOnHide',
                        ignore: true
                    },
                    {
                        key: 'protected',
                        ignore: true
                    },
                    {
                        key: 'hidden',
                        ignore: true
                    },
                    {
                        key: 'mask',
                        ignore: true
                    },
                    {
                        key: 'disabled',
                        ignore: true
                    },
                    {
                        key: 'autofocus',
                        ignore: true
                    },
                    {
                        key: 'tableView',
                        ignore: true
                    },
                    {
                        key: 'alwaysEnabled',
                        ignore: true
                    },
                    {
                        key: 'multiple',
                        ignore: true
                    },
                    {
                        key: 'optionsLabelPosition',
                        ignore: true
                    }
                ]
            },
            {
                key: 'Advanced',
                label: 'Advanced',
                ignore: true,
                components: [
                    {
                        key: 'placeholder',
                        input: true,
                        label: 'Placeholder',
                        placeholder: 'Placeholder',
                        type: 'textfield'
                    },
                    {
                        key: 'customClass',
                        input: true,
                        label: 'Custom Class',
                        placeholder: 'Custom Class',
                        type: 'textfield'
                    },
                    {
                        key: 'tabindex',
                        input: true,
                        label: 'Tab Index',
                        placeholder: 'Tab Index',
                        type: 'textfield'
                    },
                    // {
                    //   key: 'persistent',
                    //   input: true,
                    //   label: 'Persistent',
                    //   type: 'radio',
                    // },
                    {
                        key: 'clearOnHide',
                        input: true,
                        label: 'Clear Value When Hidden',
                        type: 'checkbox'
                    },
                    {
                        key: 'protected',
                        input: true,
                        label: 'Protected',
                        type: 'checkbox'
                    },
                    {
                        key: 'hidden',
                        input: true,
                        label: 'Hidden',
                        type: 'checkbox'
                    },
                    {
                        key: 'mask',
                        input: true,
                        label: 'Hide Input',
                        type: 'checkbox'
                    },
                    {
                        key: 'disabled',
                        input: true,
                        label: 'Disabled',
                        type: 'checkbox'
                    },
                    {
                        key: 'autofocus',
                        input: true,
                        label: 'Initial Focus',
                        type: 'checkbox'
                    },
                    {
                        key: 'tableView',
                        input: true,
                        label: 'Table View',
                        type: 'checkbox'
                    },
                    {
                        key: 'alwaysEnabled',
                        input: true,
                        label: 'Always Enabled',
                        type: 'checkbox'
                    }
                ]
            }
        ],

    }
};
