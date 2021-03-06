// reg
const mobileReg = /^[\d|+|-]*$/;
const emailReg = /@(163|foxmail|qq|gmail)\./;

const openNewWindow = (url) => {
  window.location.href = url;
};

const isPC = () => {
  const userAgentInfo = navigator.userAgent;
  const Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
  let flag = true;
  for (let v = 0; v < Agents.length; v += 1) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
};

var joinListOnClick = function(index) {
  var joinLists = document.getElementsByClassName('list-item');
  var joinListsLength = joinLists.length;
  for (var joinListsIndex = 0; joinListsIndex < joinListsLength; joinListsIndex++) {
    var item = joinLists[joinListsIndex];
    item.className = 'list-item';
  };
  joinLists[index].className = 'list-item list-select';
}

const toggleLoginModalVisible = (e) => {
  e.stopPropagation();
  const loginModal = document.getElementById('login-modal');
  const className = loginModal.className;
  if (className === 'login-modal') {
    const hostsName = document.getElementById('input-hosts');
    hostsName.focus();
    loginModal.className = 'login-modal modal-show';
  } else {
    const hostsName = document.getElementById('input-hosts');
    hostsName.value = null;
    const parent = hostsName.parentNode.parentNode;
    if (parent.className.indexOf('err') > -1) {
      parent.className = parent.className.replace(/err/, '')
    }
    loginModal.className = 'login-modal';
  }
};

// cover 
const showCover = () => {
  const cover = document.getElementById('cover');
  if (cover) {
    cover.className = 'cover-show';  
  }
};

const hideCover = () => {
  const cover = document.getElementById('cover');
  if (cover) {
    cover.className = '';  
  }
};


const toggleApplicationModalVisible = (e) => {
  e.stopPropagation();
  const applicationModal = document.getElementById('modal-application');
  const className = applicationModal.className;
  if (className === 'modal') {
    showCover();
    applicationModal.className = 'modal modal-show';
  } else {
    document.removeEventListener('root').addEventListener('click', closeApplicationModal, false);
    hideCover();
    applicationModal.className = 'modal';
  }
};

const closeApplicationModal = () => {
  const applicationModal = document.getElementById('modal-application');
  if (applicationModal) {
    hideCover();
    applicationModal.className = 'modal';
  }
};
const closeleLoginModal = () => {
  const applicationModal = document.getElementById('login-modal');
  if (applicationModal) {
    const hostsName = document.getElementById('input-hosts');
    hostsName.value = null;
    const parent = hostsName.parentNode.parentNode;
    if (parent.className.indexOf('err') > -1) {
      parent.className = parent.className.replace(/err/, '')
    }
    applicationModal.className = 'login-modal';
  }
};

const request = (url, params) => {
  return fetch(
    `${window.backhost}${url}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(params)
    }
  )
    .then(function(response) {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }

      const error = new Error(response.statusText);
      error.response = response;
      throw error;
    })
    .then(data => ({ data }))
    .catch(err => ({ err }));
};

const onChangeClearErr = (item) => {
  if (item && item.className !== "form-item") {
    item.className = "form-item";
  }
};

const addItemListen = () => {
  const mapItems = (items) => {
    for (let i = 0; i < items.length; i++) {
      const itemBlock = items[i];
      const itemInput = itemBlock.querySelector('input');
      if (itemInput) {
        const onChange = () => {
          onChangeClearErr(itemBlock);
        };
        itemInput.addEventListener('input', onChange, true);
      }
    }
  };

  try {
    if (form1) {
      const form1s = form1.querySelectorAll('.form-item') || [];
      mapItems(form1s);
    }
  } catch(e) {
  }
  try {
    if (formModal) {
      const formModals = formModal.querySelectorAll('.form-item');
      mapItems(formModals);
    }
  } catch(e) {
  }
  try {
    if (formReserve) {
      const formReserves = formReserve.querySelectorAll('.form-item') || [];
      mapItems(formReserves);
      const itemBlock = formReserve.querySelector('.form-wrap');
      const itemTextarea = itemBlock.querySelector('textarea');
      const onChange = () => {
        itemBlock.className = 'form-wrap';
      };
      itemTextarea.addEventListener('input', onChange, true);
    }
  } catch(e) {
  }
};

const validateTextarea = (value = '', item) => {
  if (value.length === 0) {
    item.setAttribute('data-err', item.getAttribute('data-attr'));
    item.className = "form-wrap errTextarea";
    return false;
  }

  item.className = "form-wrap";
  return true
};

const validate = (value = '', item, regs = {}) => {
  const { reg, negateReg } = regs;
  if (value.length === 0) {
    item.setAttribute('data-err', item.getAttribute('data-attr'));
    item.className = "form-item err";
    return false;
  }

  if (reg && !reg.test(value)) {
    item.setAttribute('data-err', item.getAttribute('data-input'));
    item.className = "form-item err";
    return false;
  }

  if (negateReg && negateReg.test(value)) {
    item.setAttribute('data-err', item.getAttribute('data-input'));
    item.className = "form-item err";
    return false; 
  }

  item.className = "form-item";
  return true;
};

const clearForm = () => {
  form1.name.value = '';
  form1.email.value = '';
  form1.mobile.value = '';
  form1.company.value = '';
  form1.department.value = '';
  form1.title.value = '';
};

const submitForm = () => {
  const name = form1.name.value;
  const email = form1.email.value;
  const mobile = form1.mobile.value;
  const company = form1.company.value;
  const department = form1.department.value;
  const title = form1.title.value;

  const allItem = form1.querySelectorAll('.form-item');

  const validateAll = () => {
    let isErr = false;

    if (!validate(name, allItem[0])) {
      isErr = true;
    }
    if (!validate(email, allItem[1], { negateReg: emailReg })) {
      isErr = true;
    }
    if (!validate(mobile, allItem[2], { reg: mobileReg })) {
      isErr = true;
    }
    if (!validate(company, allItem[3])) {
      isErr = true;
    }
    if (!validate(department, allItem[4])) {
      isErr = true;
    }
    if (!validate(title, allItem[5])) {
      isErr = true;
    }
    return isErr;
  };

  if (
    validateAll()
  ) {
    return false;
  }

  const params = {
    name,
    email,
    mobile,
    company,
    department,
    title,
    source: SOURCE
  };
  request('/website/trail', params)
    .then(({ data }) => {
      if (data) {
        closeApplicationModal();
        clearForm();
        onSucceed();
      } else {
        onErr();
      }
    });
};

const submitModalForm = () => {
  const  name = formModal.name.value;
  const  email = formModal.email.value;
  const  mobile = formModal.mobile.value;
  const  company = formModal.company.value;
  const  department = formModal.department.value;
  const  title = formModal.title.value;
  const params = {
    name,
    email,
    mobile,
    company,
    department,
    title,
    source: SOURCE
  };

  const allItem = formModal.querySelectorAll('.form-item');

  const validateAll = () => {
    let isErr = false;
    if (!validate(name, allItem[0])) {
      isErr = true;
    }
    if (!validate(email, allItem[1], { negateReg: emailReg })) {
      isErr = true;
    }
    if (!validate(mobile, allItem[2], { reg: mobileReg })) {
      isErr = true;
    }
    if (!validate(company, allItem[3])) {
      isErr = true;
    }
    if (!validate(department, allItem[4])) {
      isErr = true;
    }
    if (!validate(title, allItem[5])) {
      isErr = true;
    }
    return isErr;
  };

  if (
    validateAll()
  ) {
    return false;
  }

  request('/website/trail', params)
    .then(({ data }) => {
      if (data) {
        onSucceed();
        closeApplicationModal();
        clearFormModal();
      } else {
        onErr();
      }
    });
};

const clearFormReserve = () => {
  formReserve.name.value = "";
  formReserve.email.value = "";
  formReserve.mobile.value = "";
  formReserve.company.value = "";
  formReserve.type[0].checked = true;
  formReserve.type[1].checked = false;
  formReserve.content.value = "";
};


const submitFormReserve = () => {
  const type1 = formReserve.type[0].checked;
  const type2 = formReserve.type[1].checked;
  const typeValue = () => {
    if (type1) {
      return 0;
    }
    if (type2) {
      return 1;
    }
    return undefined;
  };

  const name = formReserve.name.value;
  const email = formReserve.email.value;
  const mobile = formReserve.mobile.value;
  const company = formReserve.company.value;
  const type = typeValue();
  const content = formReserve.content.value;
  const params = {
    name,
    email,
    mobile,
    company,
    type,
    content,
    source: SOURCE
  };

  const allItem = formReserve.querySelectorAll('.form-item');
  const textareaItem = formReserve.querySelector('.form-wrap');

  const validateAll = () => {
    let isErr = false;
    if (!validate(name, allItem[0])) {
      isErr = true;
    }
    if (!validate(email, allItem[1], { negateReg: emailReg })) {
      isErr = true;
    }
    if (!validate(mobile, allItem[2], { reg: mobileReg })) {
      isErr = true;
    }
    if (!validate(company, allItem[3])) {
      isErr = true;
    }
    if (!validateTextarea(content, textareaItem)) {
      isErr = true;
    }
    return isErr;
  };

  if (
    validateAll()
  ) {
    return false;
  }


  request('/website/feedback', params)
    .then(({ data }) => {
      if (data) {
        onSucceed();
        clearFormReserve();
      } else {
        onErr();
      }
    });
};

const nextCard = () => {
  const cards = document.getElementsByClassName('show-card');
  const cardsLength = cards.length;
  let currentIndex = 0;
  let currentItem = null;
  for (let cardsIndex = 0; cardsIndex < cardsLength; cardsIndex++) {
    const item = cards[cardsIndex];
    const className = item.className;
    if (className === 'show-card show') {
      currentIndex = cardsIndex;
      currentItem = item;
    }
  };
  if (currentItem) {
    const nextIndex = (currentIndex + 1) % cardsLength;
    const nextNextIndex = (nextIndex + 1) % cardsLength;
    const upIndex = (cardsLength + currentIndex - 1) % cardsLength;
    currentItem.className = 'show-card';
    cards[nextIndex].className = 'show-card show';

    cards[nextIndex].style.left = '0%';
    cards[nextNextIndex].style.left = '100%';
    currentItem.style.left = '-100%';
  }
};

const upCard = () => {
  const cards = document.getElementsByClassName('show-card');
  const cardsLength = cards.length;
  let currentIndex = 0;
  let currentItem = null;
  for (let cardsIndex = 0; cardsIndex < cardsLength; cardsIndex++) {
    const item = cards[cardsIndex];
    const className = item.className;
    if (className === 'show-card show') {
      currentIndex = cardsIndex;
      currentItem = item;
    }
  };
  if (currentItem) {
    const nextIndex = (currentIndex + 1) % cardsLength;
    const upIndex = (cardsLength + currentIndex - 1) % cardsLength;
    const upUpIndex = (cardsLength + upIndex - 1) % cardsLength;
    currentItem.className = 'show-card';
    cards[upIndex].className = 'show-card show';

    cards[upIndex].style.left = '0%';
    currentItem.style.left = '100%';
    cards[upUpIndex].style.left = '-100%';
  }
};

const opentNewWindow = () => {
  const hostsName = document.getElementById('input-hosts');
  const hostMatch = window.host.match(/(https*:\/\/)[\w]*\.([\w]*\.[\w]*)$/) || window.host.match(/^(https*:\/\/)([\w]*\.[\w]*)$/) || [];

  request('/website/domain', { domain: hostsName.value })
    .then((res) => {
      const data = res.data || {};
      if (data.exists === 1) {
        openNewWindow(hostMatch[1] + hostsName.value + '.' + hostMatch[2]);
        hostsName.value === null
        closeleLoginModal();
      } else {
        const parent = hostsName.parentNode.parentNode;
        parent.setAttribute('class', parent.className + ' ' + 'err')
      }
    });

};

const jumpHomePage = () => {
  window.location.href = window.host;
};

const toggleNavModalVisible = (type) => {
  const modal = document.getElementById("nav-modal-id");
  if (modal) {
    modal.className = type === 'show' ? 'nav-modal modal-show' : "nav-modal";
  }
};

const loginCellOnKeyDown = (e) => {
  if (e.keyCode === 13) {
    opentNewWindow();
    return false;
  }
  return true;
};

// tootip 
const onSucceed = () => {
  const tootipSucceed = document.getElementById('tootip-succeed');
  if (tootipSucceed) {
    showCover();
    tootipSucceed.className = 'tootip-modal tootip-modal-show';
    setTimeout(function() {
      hideTootip()
      hideCover()
    }, 3000)
  }
};
const onErr = () => {
  const tootipErr = document.getElementById('tootip-err');
  if (tootipErr) {
    showCover();
    tootipErr.className = 'tootip-modal tootip-modal-show';
    setTimeout(function() {
      hideTootip()
      hideCover()
    }, 3000)
  }
};

const hideTootip = () => {
  const tootipSucceed = document.getElementById('tootip-succeed');
  const tootipErr = document.getElementById('tootip-err');
  if (tootipErr && tootipErr.className !== 'tootip-modal') {
    hideCover();
    tootipErr.className = 'tootip-modal';
  }
  if (tootipSucceed && tootipSucceed.className !== 'tootip-modal') {
    hideCover();
    tootipSucceed.className = 'tootip-modal';
  }
};

const requestWx = (url, params) => {
  return fetch(
    `https://api.elephantbi.com${url}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    }
  )
    .then(function(response) {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }

      const error = new Error(response.statusText);
      error.response = response;
      throw error;
    })
    .then(data => ({ data }))
    .catch(err => ({ err }));
};

const authlink = () => {
  requestWx('/wx/auth/link')
    .then((res) => {
      const link = res.data.auth_link;
      openNewWindow(link);
    });
};
const wxregisterlink = () => {
  requestWx('/wx/register/link')
    .then((res) => {
      const link = res.data.register_link;
      openNewWindow(link);
    });
};

// 微信扫码登录 服务
// fixed url
const FIXED_URL = window.OAUTHURL;
const gennerateFixedUrlRedirect = (rUrl) => {
  return `${FIXED_URL}/login?redirect_url=${rUrl}`;
};

// 单点登录
const REDIRECT_URL_SSO = encodeURIComponent(`${FIXED_URL}/server_redirect?env=${window.imageEnv}`);
const gennerateWxSSO = (redirectUri) => {
  return `https://open.work.weixin.qq.com/wwopen/sso/3rd_qrConnect?appid=${window.corpid}&redirect_uri=${redirectUri}&usertype=admin`;
};

const WX_SSO_RURL = encodeURIComponent(gennerateWxSSO(REDIRECT_URL_SSO));
const WX_SSO = gennerateFixedUrlRedirect(WX_SSO_RURL);

const openWxServer = () => {
  openNewWindow(WX_SSO);
};

const showIndustryModal = (e) => {
  const industryModal = document.getElementById("nav-industry-modal")
  e.stopPropagation();
  if (industryModal) {
    industryModal.style.display = 'block'
  }
}

const closeIndustryModal = (e) => {
  const industryModal = document.getElementById("nav-industry-modal")
  if (industryModal) {
    industryModal.style.display = 'none'
  }
}


/*********************************/
const switchToGroup = (e) => {
  if (e.target.checked) {

    const domainField = document.createElement('div')
    domainField.setAttribute('id', 'domain-field')

    const label = document.createElement('label');
    label.setAttribute('class', 'fake-label')
    label.innerText = '免验证邮箱域名'

    const domainItemWrapper = document.createElement('span')
    domainItemWrapper.setAttribute('class', 'domain-item-wrapper')

    const domainWrapper = document.createElement('span')
    domainWrapper.setAttribute('class', 'domain-field form-item')

    const domainFixed = document.createElement('span')
    domainFixed.setAttribute('class', 'domain-fixed')
    domainFixed.innerText = '@'

    const domainInput = document.createElement('input')
    domainInput.setAttribute('id', 'input-domain')
    domainInput.placeholder = '请输入团队域名'

    const domainImage = document.createElement('img')
    domainImage.src = require('../assets/checked.png')

    domainWrapper.appendChild(domainFixed)
    domainWrapper.appendChild(domainInput)
    domainWrapper.appendChild(domainImage)
    domainItemWrapper.appendChild(domainWrapper)

    const domainDescription = document.createElement('div')
    domainDescription.setAttribute('class', 'url-description')
    domainDescription.style.width = '300px'
    domainDescription.style.marginBottom = '35px'
    domainDescription.innerText = '免验证邮箱域名登陆后，不需要管理员审核，团队创建巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉'

    domainField.appendChild(label)
    domainField.appendChild(domainItemWrapper)
    domainField.appendChild(domainDescription)
    const freeTitle = document.getElementById('free-title')
    const registerForm = document.getElementById('register-form')
    registerForm.insertBefore(domainField, freeTitle)

    const switchLabel = document.getElementById('switch-label')
    const required = document.createElement('span')
    required.innerText = '*'
    required.setAttribute('class', 'required')
    switchLabel.innerText = "电子邮箱"
    switchLabel.appendChild(required)
    const registerEmail = document.getElementById('register-email')
    registerEmail.value = null;
    registerEmail.placeholder = '请输入登录团队使用的邮箱'
  }
}
const switchToFree = (e) => {
  if (e.target.checked) {
    const registerForm = document.getElementById('register-form')
    const domainField = document.getElementById('domain-field')
    if (domainField) {
      registerForm.removeChild(domainField)
      const switchLabel = document.getElementById('switch-label')
      const required = document.createElement('span')
      required.innerText = '*'
      required.setAttribute('class', 'required')
      switchLabel.innerText = "手机号"
      switchLabel.appendChild(required)
      const registerEmail = document.getElementById('register-email')
      registerEmail.value = null;
      registerEmail.placeholder = '请输入登录团队使用的手机号'
    }
  }
}

const submitRegister = () => {
  const registerUrl = registerForm.registerUrl.value
  const registerGroupName = registerForm.registerGroupName.value
  const registerTypeGroup = registerForm.registerType[0].checked
  const registerTypeFree = registerForm.registerType[1].checked
  const registerEmail = registerForm.registerEmail.value
  const registerVerifiedCode = registerForm.registerVerifiedCode.value
  const registerPasswordSet = registerForm.registerPasswordSet.value
  const registerPasswordConfirm = registerForm.registerPasswordConfirm.value
  const  registerDisplayName = registerForm.registerDisplayName.value
  const inputDomains = document.getElementsByClassName('input-domain')
  let errorNum = 0
  if (!registerUrl) {
    const formItem = registerForm.registerUrl.parentNode.parentNode
    formItem.className = formItem.className + ' error'
    errorNum += 1
  }
  if (!registerGroupName) {
    const formItem = registerForm.registerGroupName.parentNode
    formItem.className = formItem.className + ' error'
    errorNum += 1
  }
  if (!registerEmail) {
    const formItem = registerForm.registerEmail.parentNode
    formItem.className = formItem.className + ' error'
    errorNum += 1
  }
  if (!registerVerifiedCode) {
    const formItem = registerForm.registerVerifiedCode.parentNode.parentNode
    formItem.className = formItem.className + ' error'
    errorNum += 1
  }
  if (!registerPasswordSet) {
    const formItem = registerForm.registerPasswordSet.parentNode
    formItem.className = formItem.className + ' error'
    errorNum += 1
  }
  if (!registerPasswordConfirm) {
    const formItem = registerForm.registerPasswordConfirm.parentNode
    formItem.className = formItem.className + ' error'
    errorNum += 1
  }

  if (errorNum > 0) {
    return false
  }
  const email_domains = [];
  for(let i = 0; i < inputDomains.length; i++) {
    if (inputDomains[i].value) {
      email_domains.push(inputDomains[i].value)
    }
  }
  const params = {
    domain: registerUrl,
    name: registerGroupName,
    team_type: registerTypeGroup ? 0 : 1,
    email: registerTypeGroup ? registerEmail : null,
    mobile: registerTypeGroup ? null : registerEmail,
    code: registerVerifiedCode,
    password: registerPasswordSet,
    password_confirm: registerPasswordConfirm,
    username: registerDisplayName,
    email_domains
  }

  request('/team/create', params)
  .then(({ data }) => {
    if (data) {
      
    } else {

    }
  });
}

const sendVerification = () => { //发送存储验证码
  const registerTypeGroup = registerForm.registerType[0].checked
  const registerEmail = registerForm.registerEmail.value
  const params = {
    auth_type: registerTypeGroup ? 0 : 1,
    send_to: registerEmail,
    code_type: 2
  }
  request('/auth/code', params)
  .then(({ data }) => {
    if (data) {
      if (data.code_hash) {
        sessionStorage.setItem("verify", data.code_hash)
      }
    } else {
    }
  });
}

const currentError = (node) => { //校验当前是否为错误状态
  if (node.className.indexOf('error') == -1) {
    return false
  }
  return true
}

const verifyCodeValidate = (value) => { //验证码校验
  const md5 = require('MD5')
  const verifyCodeInput = document.getElementById('verifycode')
  const errNode = verifyCodeInput.parentNode.parentNode
  if (!value) {
    if (!currentError(errNode)) {
      errNode.className = errNode.className + ' error'
    }
    errNode.setAttribute('data-err', '请输入验证码')
    return false
  } else {
    const verifyCode = sessionStorage.getItem('verify')
    if (md5(value) !== verifyCode) {
      if (!currentError(errNode)) {
        errNode.className = errNode.className + ' error'
      }
      errNode.setAttribute('data-err', '验证码输入错误')
      return false
    }
    if (currentError(errNode)) {
      errNode.className = errNode.className.replace(/error/, '')
    }
    return true
  }
}

const utlInputValidate = (value) => { //团队域名校验
  const registerUrlInput = document.getElementById('input-url')
  const errNode = registerUrlInput.parentNode.parentNode
  if (!value) {
    if (!currentError(errNode)) {
      errNode.className = errNode.className + ' error'
    }
    return false
  }
  if (currentError(errNode)) {
    errNode.className = errNode.className.replace(/error/, '')
  }
  return true
}

const groupNameValidate = (value) => { //团队名称校验
  const registerGroupName = document.getElementById('register-group-name')
  const errNode = registerGroupName.parentNode
  if (!value) {
    if (!currentError(errNode)) {
      errNode.className = errNode.className + ' error'
    }
    return false
  }
  if (currentError(errNode)) {
    errNode.className = errNode.className.replace(/error/, '')
  }
  return true
}

const registerEmailMobileValidate = (value) => { //邮箱手机号校验
  const registerEmail = document.getElementById('register-email')
  const registerTypeGroup = registerForm.registerType[0].checked //checked-email unchecked-mobile
  const errNode = registerEmail.parentNode
  if (!value) {
    if (!currentError(errNode)) {
      errNode.className = errNode.className + ' error'
    }
    errNode.setAttribute('data-err', registerTypeGroup ? '请输入电子邮箱' : '请输入手机号码')
  } else {
    if (registerTypeGroup) {
      const reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
      if (!reg.test(value)) { //邮箱验证不通过
        if (!currentError(errNode)) {
          errNode.className = errNode.className + ' error'
        }
        errNode.setAttribute('data-err', '邮箱格式不正确')
        return false
      }
      if (currentError(errNode)) {
        errNode.className = errNode.className.replace(/error/, '')
      }
      return true
    }
    if (!registerTypeGroup) {
      const reg = /^[1][3,4,5,7,8][0-9]{9}$/
      if (!reg.test(value)) {
        if (!currentError(errNode)) {
          errNode.className = errNode.className + ' error'
        }
        errNode.setAttribute('data-err', '手机格式不正确')
        return false
      }
      if (currentError(errNode)) {
        errNode.className = errNode.className.replace(/error/, '')
      }
      return true
    }
  }
}

const passwordSetValidate = (value) => {
  const reg = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)\S{8,}$/
  const passwordSet = document.getElementById('password-set')
  const passwordConfirm = document.getElementById('password-confirm')
  const errNode = passwordSet.parentNode
  const confirmErrNode = passwordConfirm.parentNode
  if (!value) {
    if (!currentError(errNode)) {
      errNode.className = errNode.className + ' error'
    }
    errNode.setAttribute('data-err', '请输入密码')
  } else {
    if (!reg.test(value)) {
      if (!currentError(errNode)) {
        errNode.className = errNode.className + ' error'
      }
      errNode.setAttribute('data-err', '密码格式不正确')
      return false
    }
    if (passwordConfirm.value && value !== passwordConfirm.value) {
      if (currentError(errNode)) {
        errNode.className = errNode.className.replace(/error/, '')
      }
      if (!currentError(confirmErrNode)) {
        confirmErrNode.className = errNode.className + ' error'
      }
      confirmErrNode.setAttribute('data-err', '两次密码输入不一致')
      return false
    }
    if (currentError(errNode)) {
      errNode.className = errNode.className.replace(/error/, '')
    }
    return true
  }
}

const passwordConfirmValidate = (value) => {
  const passwordSet = document.getElementById('password-set')
  const passwordConfirm = document.getElementById('password-confirm')
  const errNode = passwordConfirm.parentNode
  if (!value) {
    if (!currentError(errNode)) {
      errNode.className = errNode.className + ' error'
    }
    errNode.setAttribute('data-err', '请确认密码')
  } else {
    if (passwordSet.value !== value) {
      if (!currentError(errNode)) {
        errNode.className = errNode.className + ' error'
      }
      errNode.setAttribute('data-err', '两次密码输入不一致')
      return false
    }
    if (currentError(errNode)) {
      errNode.className = errNode.className.replace(/error/, '')
    }
    return true
  }
}


const focusPriceList = (node, i) => {
  const colorLists = {
    '1': '#6b7c93',
    '2': '#76c1ef',
    '3': '#0abebe',
    '4': '#f5a623'
  }
  const priceLists = document.getElementsByClassName('price-list')
  for(let i = 1; i < priceLists.length; i++) {
    priceLists[i].style.border = 'none'
  }
  node.style.border = "2px solid " + colorLists[i]
}

const submitDemo = () => {
  const name = demoForm.demoName.value // required
  const email = demoForm.demoEmail.value // required
  const mobile = demoForm.demoMobile.value // required
  const company = demoForm.demoCompany.value // required
  const industry = demoForm.demoIndustry.value // required
  const scale = demoForm.demoScale.value // required
  const department = demoForm.demoDepart.value
  const position = demoForm.demoPosi.value
  const remark = demoForm.demoRemark.value
  let errNum = 0;
  if (!name) {
    if (!currentError(demoForm.demoName.parentNode)) {
      demoForm.demoName.parentNode.className = demoForm.demoName.parentNode.className + ' error'
    }
    errNum += 1
  }
  if (!email) {
    if (!currentError(demoForm.demoEmail.parentNode)) {
      demoForm.demoEmail.parentNode.className = demoForm.demoEmail.parentNode.className + ' error'
    }
    errNum += 1
  }
  if (!mobile) {
    if (!currentError(demoForm.demoMobile.parentNode)) {
      demoForm.demoMobile.parentNode.className = demoForm.demoMobile.parentNode.className + ' error'
    }
    errNum += 1
  }
  if (!company) {
    if (!currentError(demoForm.demoCompany.parentNode)) {
      demoForm.demoCompany.parentNode.className = demoForm.demoCompany.parentNode.className + ' error'
    }
    errNum += 1
  }
  if (!industry) {
    if (!currentError(demoForm.demoIndustry.parentNode)) {
      demoForm.demoIndustry.parentNode.className = demoForm.demoIndustry.parentNode.className + ' error'
    }
    errNum += 1
  }
  if (!scale) {
    if (!currentError(demoForm.demoScale.parentNode)) {
      demoForm.demoScale.parentNode.className = demoForm.demoScale.parentNode.className + ' error'
    }
    errNum += 1
  }
  if (errNum > 0) {
    return false
  }
  const params = {
    name, email, mobile,
    company, industry, scale,
    department, position, remark,
    source: '官网'
  }
  request('/website/trail', params).then((data) => {
    if (data) {
      
    } else {

    }
  })
}

const changeDomainItems = (e) => {
  const currentOperator = e.target
  const currentWrapper = currentOperator.parentNode
  const constainer = currentWrapper.parentNode
  const currentInput = currentWrapper.getElementsByTagName('input')[0]
  if (currentOperator.className.indexOf('input-domain-check') > -1) {
    if (!currentInput.value) {
      return false
    }
    currentOperator.className = currentOperator.className.replace('input-domain-check', 'input-domain-delete')
    currentOperator.src = require('../assets/delete.png')
    const newWrapper = document.createElement('span');
    newWrapper.setAttribute('class', 'domain-field form-item')
    const newFix = document.createElement('span')
    newFix.setAttribute('class', ' domain-fixed')
    newFix.innerText = '@'
    const newInput = document.createElement('input');
    newInput.setAttribute('id', 'input-domain');
    newInput.setAttribute('class', 'input-domain')
    newInput.setAttribute('placeholder', '请输入免验证域名')
    const newOperator = document.createElement('img')
    newOperator.src = require('../assets/checked.png')
    newOperator.setAttribute('class', 'input-domain-check input-domain-operator')
    newOperator.addEventListener('click', changeDomainItems)
    newWrapper.appendChild(newFix)
    newWrapper.appendChild(newInput)
    newWrapper.appendChild(newOperator)
    constainer.appendChild(newWrapper)
  }
  else {
    constainer.removeChild(currentWrapper)
  }
}

const toRegister = () => {
  window.location.href = window.location.origin + '/register.html'
}

const toDemo = () => {
  window.location.href = window.location.origin + '/demo.html'
}

const changeHeader = () => {
  const htmlDom = document.documentElement
  const navHeader = document.getElementById('nav-header')
  const logo = document.getElementById('logo')
  if (htmlDom.scrollTop > 0) {
    const navContent = document.getElementsByClassName('nav-content')[0]
    if (navContent) {
      navContent.className = 'nav-scroll-white'
      navHeader.className = navHeader.className + ' nav-header'
      logo.src = require("../assets/nav-logo-black.svg")
    }
  } else {
    const navContent = document.getElementsByClassName('nav-scroll-white')[0]
    if (navContent) {
      navContent.className = 'nav-content'
      navHeader.className = navHeader.className.replace(' nav-header', '')
      if (navHeader.className.indexOf('nav-header') == -1) {
        logo.src = require("../assets/nav-logo.svg")
      }
    }
  }
}

/*********************************/

window.onload = function () {
  //wx login
  const wxbtnlogup = document.getElementById('wx-btn-logup');
  if (wxbtnlogup) {
    wxbtnlogup.addEventListener('click', authlink, true);
  }
  const wxbtnlogin = document.getElementById('wx-btn-login');
  if (wxbtnlogin) {
    wxbtnlogin.addEventListener('click', wxregisterlink, true);
  }
  const wxbtnserverlogin = document.getElementById('wx-login');
  if (wxbtnserverlogin) {
    wxbtnserverlogin.addEventListener('click', openWxServer, true);
  }
  window.onscroll = changeHeader
  const freeBtns = document.getElementsByClassName('free-btn')
  if (freeBtns) {
    for(let i = 0; i < freeBtns.length; i ++) {
      freeBtns[i].onclick = toRegister
    }
  }
  const demoBtns = document.getElementsByClassName('demo-btn');
  if (demoBtns) {
    for(let i = 0; i < demoBtns.length; i ++) {
      demoBtns[i].onclick = toDemo
    }
  }
  const formSubmitBtn = document.getElementById('form-submit-btn-id');
  const formReserveSubmitBtn = document.getElementById('form-reserve-submit-btn-id');
  const loginModal = document.getElementById('login-modal');
  const navLogin = document.getElementById('nav-login');
  const logo = document.getElementById("logo");
  const footerLogo = document.getElementById("footer-logo")
  const industryLink = document.getElementById("nav-industry-link")

  if (industryLink) {
    industryLink.addEventListener('click', showIndustryModal, true)
  }

  //mobile nav menu
  const mNavMenu = document.getElementById("nav-menu-id");
  const mNavClose = document.getElementById("nav-modal-close-id");
  if (mNavMenu) {
    const show = (e) => {
      e.stopPropagation();
      toggleNavModalVisible('show')
    };
    mNavMenu.addEventListener('click', show, true);
  }
  if (mNavClose) {
    const hide = () => toggleNavModalVisible('hide');
    mNavClose.addEventListener('click', hide, true);
  }

  const loginProduct = document.getElementById('login-product');

  const upBtn = document.getElementById('up-btn');
  const downBtn = document.getElementById('down-btn');

  if (loginProduct) {
    loginProduct.addEventListener('click', opentNewWindow, true);
  }

  // cards up down
  if (upBtn) {
    upBtn.addEventListener('click', upCard, true);
  }
  if (downBtn) {
    downBtn.addEventListener('click', nextCard, true);
  }

  if (loginModal) {
    loginModal.addEventListener('click', function(e) {
      e.stopPropagation();
    }, false);
  }
  if (navLogin) {
    navLogin.addEventListener('click', toggleLoginModalVisible, true);
  }
  if (formReserveSubmitBtn) {
    formReserveSubmitBtn.addEventListener('click', submitFormReserve, true);
  }
  if (formSubmitBtn) {
    formSubmitBtn.addEventListener('click', submitForm, true);
  }
  if (logo) {
    logo.addEventListener('click', jumpHomePage, true);
  }
  if (footerLogo) {
    footerLogo.addEventListener('click', jumpHomePage, true);
  }

  // root listen
  document.getElementById('root').addEventListener('click', function() {
    closeApplicationModal();
    closeleLoginModal();
    toggleNavModalVisible('hide');
    hideTootip();
    closeIndustryModal();
  }, false);

  // cover listen
  document.getElementById('cover').addEventListener('click', function() {
    closeApplicationModal();
    clearFormModal();
    closeleLoginModal();
    toggleNavModalVisible('hide');
    hideTootip();
  }, false);

  // tootip listent
  document.getElementById('tootip-succeed').addEventListener('click', function() {
    hideTootip();
  }, true);
  document.getElementById('tootip-err').addEventListener('click', function() {
    hideTootip();
  }, true);


  const modalIdClose = document.getElementById('modal-id-close');
  modalIdClose.onclick = () => {
    closeApplicationModal();
    clearFormModal();
  };

  var joinLists = document.getElementsByClassName('list-item');
  var joinListsLength = joinLists.length;
  for (var joinListsIndex = 0; joinListsIndex < joinListsLength; joinListsIndex++) {
    var item = joinLists[joinListsIndex];
    var aelement = item.getElementsByTagName('a');
    const target = joinListsIndex;
    aelement[0].onclick = function() {
      joinListOnClick(target);
    };
  }

  const cards = document.getElementsByClassName('card-btn');
  const cardsLength = cards.length;
  let currentIndex = 0;
  for (let cardsIndex = 0; cardsIndex < cardsLength; cardsIndex++) {
    const item = cards[cardsIndex];
    item.onclick= toggleApplicationModalVisible;
  };

  // items onchange
  addItemListen();
  const loginCell = document.body.querySelector('.login-cell');
  if (loginCell) {
    loginCell.addEventListener('keydown', loginCellOnKeyDown, true);
  }

  /**********************************/
  const priceLists = document.getElementsByClassName('price-list')

  const registerGroupRadio = document.getElementById('comp-group')
  const registerFreeRadio = document.getElementById('free-group')
  const sendVerifyBtn = document.getElementById('send-verifycode')
  const verifyCodeInput = document.getElementById('verifycode')
  const registerUrlInput = document.getElementById('input-url')
  const registerGroupName = document.getElementById('register-group-name')
  const registerEmail = document.getElementById('register-email')
  const passwordSet = document.getElementById('password-set')
  const passwordConfirm = document.getElementById('password-confirm')
  const demoSubmitBtn = document.getElementById('demo-submit');
  const domainOperators = document.getElementsByClassName('input-domain-operator');
  if (registerGroupRadio) {
    registerGroupRadio.addEventListener('change', switchToGroup)
  }
  if (registerFreeRadio) {
    registerFreeRadio.addEventListener('change', switchToFree)
  }
  const registerBtn = document.getElementById('register-button')
  if (registerBtn) {
    registerBtn.addEventListener('click', submitRegister, true);
  }
  if (sendVerifyBtn) {
    sendVerifyBtn.addEventListener('click', sendVerification, true)
  }
  if (registerUrlInput) {
    registerUrlInput.addEventListener('input', function(e){ utlInputValidate(e.target.value) })
  }
  if (verifyCodeInput) {
    verifyCodeInput.addEventListener('input', function(e){ verifyCodeValidate(e.target.value) })
  }
  if (registerGroupName) {
    registerGroupName.addEventListener('input', function(e){ groupNameValidate(e.target.value) })
  }
  if (registerEmail) {
    registerEmail.addEventListener('input', function(e){ registerEmailMobileValidate(e.target.value) })
  }
  if (passwordSet) {
    passwordSet.addEventListener('input', function(e) { passwordSetValidate(e.target.value) })
  }
  if (passwordConfirm) {
    passwordConfirm.addEventListener('input', function(e){ passwordConfirmValidate(e.target.value) })
  }

  if (priceLists) {
    for(let i = 1; i < priceLists.length; i ++) {
      priceLists[i].addEventListener('click', function(){ focusPriceList(priceLists[i], i) }, true)
    }
  }

  if (demoSubmitBtn) {
    demoSubmitBtn.addEventListener('click', submitDemo, true)
  }

  if (domainOperators) {
    domainOperators[0].addEventListener('click', changeDomainItems, true)
  }
  /**********************************/
}
