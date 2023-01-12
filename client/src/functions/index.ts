import { categoryType } from "../config/types"

export function debounce<Params extends any[]>(
    func: (...args: Params) => any,
    timeout: number,
  ): (...args: Params) => void {
    let timer: NodeJS.Timeout
    return (...args: Params) => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        func(...args)
      }, timeout)
    }
  }

export const isMobileDevice = () => {
    if(window.outerWidth > 1200) {
        return false
    }
    else {
        return true
    }
}

export const getVW = (percent:number):number => {
  var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  const res = ((percent * w) / 100)
  return Math.trunc(res);
}

export const categoriesInCommon = (cardCategories:number[], allCategories:categoryType[]) => {
  const matchedCategories = cardCategories.map(element => {
    const find = allCategories.find(el => el.id === element)
    if(find) return find.name
    else return ''
  })
  return matchedCategories
}