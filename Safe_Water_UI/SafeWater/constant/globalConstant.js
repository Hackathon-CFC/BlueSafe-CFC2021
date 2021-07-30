const globalConstant =  {
    
    registerationFormFields:  [
        {name: 'name',        type: 'text',     label: 'Enter Full Name',       placeholder: 'Enter Full Name'},
        {name: 'mobile',      type: 'text',     label: 'Enter Mobile Number',   placeholder: 'Enter Mobile Number', maxValue: 9999999999, minValue: 0},
        {name: 'email',       type: 'text',     label: 'Enter Email Address',   placeholder: 'Enter Email Address'},
        {name: 'address',     type: 'text',     label: 'Enter Your Address',     placeholder: 'Enter Your Address'},
        {name: 'pin',         type: 'text',     label: 'Enter PIN',             placeholder: 'Enter PIN', maxValue: 999999, minValue: 0},
        {   
            name: 'role',        
            type: 'dropdown', 
            label: 'Enter User Role',
            options: [
                {label: 'Customer', value: 'Customer'},
                {label: 'Vendor', value: 'Vendor'}
            ]
        }
    ],

    complaintFormFields:  [
        {name: 'pH',       type: 'text',     label: 'Water pH level',       placeholder: 'Enter pH Level', maxValue: 14, minValue: 0},
        {name: 'tds',      type: 'text',     label: 'TDS',                  placeholder: 'Enter TDS Level', maxValue: 99999, minValue: 0},
        {name: 'salinity', type: 'text',     label: 'Salinity',             placeholder: 'Enter Salinity Level'},
        {name: 'address',  type: 'text',     label: 'Enter Your Address',    placeholder: 'Enter Your Address'},
        {name: 'pin',      type: 'text',     label: 'Enter PIN',            placeholder: 'Enter PIN', maxValue: 999999, minValue: 0},
    ],

    addSafeWaterSpotFields: [
        {name: 'name',      type: 'text',     label: 'Enter Name',           placeholder: 'Enter Name'},
        {name: 'pin',       type: 'text',     label: 'Enter Area Code',      placeholder: 'Enter Area Code', maxValue: 999999, minValue: 0},
        {name: 'address',   type: 'textarea', label: 'Enter Address',        placeholder: 'Enter Address'},
        {name: 'capacity',  type: 'text',     label: 'Capacity (in liters)', placeholder: 'Capacity'},
        {name: 'pH',        type: 'text',     label: 'Water pH level',       placeholder: 'Enter pH Level', maxValue: 14, minValue: 0},
        {name: 'tds',       type: 'text',     label: 'TDS',                  placeholder: 'Enter TDS Level',  maxValue: 99999, minValue: 0},
        {name: 'salinity',  type: 'text',     label: 'Salinity',             placeholder: 'Enter Salinity Level'},
    ],

    notificationFields: [
        {name: 'id',    type: 'select',   label: 'Choose spot'},
        {   
            name: 'actual',  
            type: 'radio',    
            label: 'Did you find the water at this spot ?',
            options: [
                {label: 'Yes', value: 'Yes'},
                {label: 'No', value: 'No'}
            ]
        },
        {   
            name: 'quality', 
            type: 'radio',    
            label: 'How was the water supply?',
            options: [
                {label: 'Good', value: 'Good'},
                {label: 'Bad', value: 'Bad'}
            ]
        },
        {name: 'comment', type: 'textarea', label:  'Add more detais'},
    ],

    home_customer_labels : {
        safe_drinking: 'Safe Drinking Water Sites',
        portable_water: 'Portable Water Suppliers',
        lake_water: 'Lake/River Water',
        water_cooler: 'Water Coolers',
        water_quality: 'Report water quality',
        raise_complaint: 'Raise a request'
    },

    home_vendor_labels : {
        safe_drinking: 'Add drinking water sites',
        portable_water: 'Add portable water sites',
        lake_water: 'Add lake/river water sites',
        water_cooler: 'Add water cooler sites'
    },
    
    user_role: {
        'CUSTOMER': 'CUSTOMER',
        'VENDOR': 'VENDOR',
        'ADMIN': 'ADMIN'
    }
}

export default globalConstant;