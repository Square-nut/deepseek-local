import {ELEMENTS_AUTH} from "@sys/store/mutation-types";

const PERMISSION_EDIT = "2";
const PERMISSION_READONLY = "1";
const PERMISSION_INVISIBLE = "0";

/**
 * v-has-permi指令 元素显示隐藏的权限指令
 * @param key:权限标识; formRule:表单校验对象; elModel:元素绑定model
 * @type {{inserted(*=, *, *): void}}
 */
export const hasPermi = {
  inserted(el, binding, vnode) {
    // key: 权限标识;  formRule: 表单校验对象; elModel: 元素绑定model
    const { key,formRule,elModel } = binding.value
    const hasPermissions = getPermissionValue(key)
    //0:不可见, 1:只读  2: 编辑
    if (hasPermissions && hasPermissions === PERMISSION_INVISIBLE) {
      el.parentNode && el.parentNode.removeChild(el)
      if(formRule && elModel){
        if(typeof(elModel) == 'string'){
          delete formRule[elModel]
        }else{
         for(let model of elModel){
           delete formRule[model]
         }
        }
      }
    }
  }
}

/**
 * 根据权限判断元素是否只读
 * @param permissionKey
 * @returns {boolean}
 */
export const isDisabled = (permissionKey) => {
  const hasPermissions =getPermissionValue(permissionKey)
  //0:不可见, 1:只读  2: 编辑
  if(hasPermissions && hasPermissions === PERMISSION_READONLY){
    return true;
  }
  return false;
}

/**
 * 列过滤器
 * 筛选有权限的列(显示/只读)
 * @param columns
 * @returns {*[]}
 */
export const colAuthFilter = (columns) => {
  return [...getPermissionCols(columns)];
}

function getPermissionCols(columns){
  let newCols = [];
  for( let col of columns){
    let hasPermission = true
    if(col.permiKey){
      const permissionValue = getPermissionValue(col.permiKey);
      if(permissionValue === PERMISSION_INVISIBLE){
        hasPermission = false
      }
    }
    if(hasPermission){
      newCols.push(col);
      if(col.children && col.children.length > 0){
        let children = Object.assign({},col.children);
        col.children = [...getPermissionValue(children)];
      }
    }
  }
  return newCols
}


/**
 * 根据permissionKey获取权限值
 * @param permissionKey
 * @returns {string|*|string}
 */
function getPermissionValue(permissionKey){
  let elementsAuth = JSON.parse(sessionStorage.getItem(ELEMENTS_AUTH) || "[]");
  if (elementsAuth.length == 0){
    return PERMISSION_EDIT;
  }
  if (permissionKey) {
    if(typeof(permissionKey) == 'string'){
      const permissionValue = elementsAuth[permissionKey] ? elementsAuth[permissionKey] : PERMISSION_EDIT
      return permissionValue;
    }else{
      const hasPermission = permissionKey.some(key => {
        const permissionValue = elementsAuth[key] ? elementsAuth[key] : PERMISSION_EDIT
        return permissionValue === PERMISSION_EDIT
      })
      return hasPermission ? PERMISSION_EDIT : PERMISSION_INVISIBLE
    }
  } else {
    throw new Error(`请设置操作权限标签值`)
  }
}


