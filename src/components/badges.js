import React from 'react';

const Badge = (props) => {
  const PRIMARY_CLASS_LIST = "bg-blue-100 text-blue-800";
  const SECONDARY_CLASS_LIST = "bg-teal-100 text-teal-800";
  const SUCCESS_CLASS_LIST = "bg-green-100 text-green-800";
  const DANGER_CLASS_LIST = "bg-red-100 text-red-800";
  const WARNING_CLASS_LIST = "bg-yellow-100 text-yellow-800";
  const CLASS_LIST="bg-gray-100 text-gray-800";


  let classList = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium leading-4 ";

  switch(props.type) {
    case 'primary':
      classList += PRIMARY_CLASS_LIST;
      break;
    case 'secondary':
      classList += SECONDARY_CLASS_LIST;
      break;
      case 'success':
      classList += SUCCESS_CLASS_LIST;
      break;
      case 'danger':
      classList += DANGER_CLASS_LIST;
      break;
      case 'warning':
      classList += WARNING_CLASS_LIST;
      break;
    default:
      classList += CLASS_LIST;
      break;
  }

  return (
    <span className={classList}>
      {props.children}
    </span>
  )
}

export default Badge;
