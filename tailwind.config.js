/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}',],
    theme: {
        extend: {},
    },
    plugins: [
        function ({addComponents}) {
            addComponents({
                '.show-menu': {
                    width: '376px',
                    height: '500px',
                    position: 'absolute',
                    left: '0px',
                    transition: '1s',
                },
                '.hide-menu': {
                    width: '376px',
                    height: '500px',
                    position: 'absolute',
                    left: '-376px',
                    transition: '1s',
                },
                '.border-1': {
                    borderWidth: '1px',
                },
                '.common-popup__bg': {
                    position: 'fixed',
                    top: '0px',
                    left: '0px',
                    zIndex: '9999',
                    background: 'rgba(51, 51, 51, 0.5)',
                    width: '100%',
                    height: '100%',
                },
                '.common-popup__wrap': {
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                },
                '.common-popup__box': {
                    backgroundColor: '#FFFFFF',
                    minHeight: '168px',
                    borderRadius: '8px',
                },
                '.common-popup__close': {
                    display: 'flex',
                    justifyContent: 'end',
                    padding: '0 10px',
                },

                '.common-popup__body': {
                    paddingRight: '20px',
                    paddingLeft: '20px',
                    paddingBottom: '20px',
                    textAlign: 'center',
                    minHeight: '48px',
                },
                '.common-popup__btn': {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                },
                '.intro_bg': {
                    height: '500px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#f5f5f5'
                },
                '.select__wrap':{
                    border: '1px solid #e5e5e5',
                    padding: '0 10px',
                },
                '.input__wrap':{
                    border: '1px solid #e5e5e5',
                    display: 'flex',
                    alignItems: 'center',
                },
                '.input__box':{
                    padding: '10px 10px',
                },
                '.search__btn':{
                    border: '1px solid #e5e5e5',
                    padding: '10px 15px',
                },
                '.w-1280':{
                    width: '1280px',
                },
            })
        },
    ],
}

