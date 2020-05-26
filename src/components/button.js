import React from 'react';

const Button = (props) => {
  const XS_BUTTON_CLASS = "px-2.5 py-1.5 text-xs leading-4 ";
  const SM_BUTTON_CLASS = "px-3 py-2 text-sm leading-4 ";
  const MD_BUTTON_CLASS = "px-4 py-2 text-sm leading-5 ";
  const LG_BUTTON_CLASS = "px-4 py-2 text-base leading-6 ";
  const XL_BUTTON_CLASS = "px-6 py-3 text-base leading-6 ";
  
  const PRIMARY_BUTTON_CLASS = "border border-transparent font-medium rounded text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150 ";
  const SECONDARY_BUTTON_CLASS = "border border-transparent font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-50 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-blue-200 transition ease-in-out duration-150 ";
  const DANGER_BUTTON_CLASS = "border border-transparent font-medium rounded text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700 transition ease-in-out duration-150 ";
  const SUCCESS_BUTTON_CLASS = "border border-transparent font-medium rounded text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green active:bg-green-700 transition ease-in-out duration-150 ";
  const BUTTON_CLASS = "border border-gray-300 font-medium rounded text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150 ";

  let classList = 'inline-flex items-center ';

  switch(props.size) {
    case 'tiny':
      classList = classList + XS_BUTTON_CLASS;
      break;
    case 'small':
      classList = classList + SM_BUTTON_CLASS;
      break;
    case 'medium':
      classList = classList + MD_BUTTON_CLASS;
      break;
    case 'large':
      classList = classList + LG_BUTTON_CLASS;
      break;
    case 'extra_large':
      classList = classList + XL_BUTTON_CLASS;
      break;
    default:
      classList = classList + MD_BUTTON_CLASS;
  }

  switch(props.type) {
    case 'primary':
      classList += PRIMARY_BUTTON_CLASS;
      break;
    case 'secondary':
      classList += SECONDARY_BUTTON_CLASS;
      break;
    case 'danger':
      classList += DANGER_BUTTON_CLASS;
      break;
    case 'success':
      classList += SUCCESS_BUTTON_CLASS;
      break;
    default:
      classList += BUTTON_CLASS;
  }

  return (
    <button type="button" class={classList}>
      {props.children}
    </button>
  );
}

export default Button;
