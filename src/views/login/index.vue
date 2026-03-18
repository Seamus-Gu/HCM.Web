<template>
  <div class="login-container">
    <div class="login-form" :class="{ 'right-panel-active': togglePanel }">
      <div class="form-container sign-up-container">
        <div class="sign-up-title">注册</div>

        <s-form-content
          class="sign-up-body"
          ref="registerFormRef"
          :schema="registerSchema"
          :model="registerFormState"
          :rules="regesiterRules"
        >
          <template #userName>
            <s-flex-col :span="24">
              <s-form-item prop="userName">
                <s-input
                  v-model="registerFormState.userName"
                  :clearable="true"
                  auto-complete="off"
                  readonly
                  onfocus="this.removeAttribute('readonly')"
                  placeholder="请输入用户名"
                >
                  <template #prefix>
                    <svg class="icon" ariel-hidden="true" font-size="16px">
                      <use xlink:href="#icon-yonghu" />
                    </svg>
                  </template>
                </s-input>
              </s-form-item>
            </s-flex-col>
          </template>
          <template #password>
            <s-flex-col :span="24">
              <s-form-item prop="password">
                <s-input
                  v-model="registerFormState.password"
                  type="password"
                  :clearable="true"
                  :show-password="true"
                  placeholder="请输入密码"
                >
                  <template #prefix>
                    <svg class="icon" ariel-hidden="true" font-size="16px">
                      <use xlink:href="#icon-mima" />
                    </svg>
                  </template>
                </s-input>
              </s-form-item>
            </s-flex-col>
          </template>
          <template #confirm>
            <s-flex-col :span="24">
              <s-form-item ref="confirm" name="confirm" class="password">
                <s-input
                  v-model="registerFormState.confirm"
                  type="password"
                  :clearable="true"
                  auto-complete="off"
                  placeholder="确认密码"
                >
                  <template #prefix>
                    <svg class="icon" ariel-hidden="true" font-size="16px">
                      <use xlink:href="#icon-mima" />
                    </svg>
                  </template>
                </s-input>
              </s-form-item>
            </s-flex-col>
          </template>
          <template #email>
            <s-flex-col :span="24">
              <s-form-item prop="email">
                <s-input
                  v-model="registerFormState.email"
                  :clearable="true"
                  auto-complete="off"
                  placeholder="请输入邮箱"
                >
                  <template #append>
                    <s-button :disabled="isCounting" @click="handleGetCode">
                      {{ codeText }}
                    </s-button>
                  </template>
                </s-input>
              </s-form-item>
            </s-flex-col>
          </template>
          <template #phoneNumber>
            <s-flex-col :span="12">
              <s-form-item prop="phoneNumber">
                <s-input
                  v-model="registerFormState.phoneNumber"
                  :clearable="true"
                  placeholder="请输入电话号码"
                >
                </s-input>
              </s-form-item>
            </s-flex-col>
          </template>
          <template #emailCode>
            <s-flex-col :span="12">
              <s-form-item prop="emailCode">
                <s-input
                  v-model="registerFormState.emailCode"
                  :clearable="true"
                  placeholder="请输入验证码"
                >
                </s-input>
              </s-form-item>
            </s-flex-col>
          </template>

          <template #button>
            <s-flex-col :span="24">
              <s-form-item>
                <s-button
                  style="width: 100%; margin-top: 8px"
                  size="large"
                  class="login-button"
                  type="primary"
                  :loading="loading"
                  @click="handleRegister"
                >
                  注册
                </s-button>
              </s-form-item>
            </s-flex-col>
          </template>
        </s-form-content>
      </div>
      <div class="form-container sign-in-container">
        <h1 class="sign-in-title">登录</h1>

        <s-form-content
          class="sign-in-body"
          ref="loginFormRef"
          :schema="loginFormSchema"
          :model="loginFormState"
          :rules="loginRules"
        >
          <template #userName>
            <s-flex-col :span="24">
              <s-form-item prop="userName">
                <s-input
                  v-model="loginFormState.userName"
                  :clearable="true"
                  size="large"
                  auto-complete="off"
                  placeholder="请输入用户名"
                >
                  <template #prefix>
                    <svg class="icon" ariel-hidden="true" font-size="16px">
                      <use xlink:href="#icon-yonghu" />
                    </svg>
                  </template>
                </s-input>
              </s-form-item>
            </s-flex-col>
          </template>

          <template #pwd>
            <s-flex-col :span="24">
              <s-form-item prop="pwd">
                <s-input
                  v-model="loginFormState.pwd"
                  type="password"
                  :clearable="true"
                  size="large"
                  auto-complete="off"
                  :show-password="true"
                  placeholder="请输入密码"
                  @keyup.enter="handleLogin"
                >
                  <template #prefix>
                    <svg class="icon" ariel-hidden="true" font-size="16px">
                      <use xlink:href="#icon-mima" />
                    </svg>
                  </template>
                </s-input>
              </s-form-item>
            </s-flex-col>
          </template>
          <template #fotget>
            <s-flex-col :span="24">
              <s-form-item>
                <s-button
                  class="forget-button"
                  :loading="forgetLoading"
                  link
                  @click="handleForget"
                >
                  忘记密码?
                </s-button>
              </s-form-item>
            </s-flex-col>
          </template>
          <template #button>
            <s-flex-col :span="24">
              <s-button
                style="width: 100%"
                size="large"
                class="login-button"
                type="primary"
                :loading="loading"
                @click="handleLogin"
              >
                登录
              </s-button>
            </s-flex-col>
          </template>
        </s-form-content>
      </div>

      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1 class="black-text">没有账号?</h1>
            <p class="black-text">立即注册</p>
            <s-button
              size="large"
              class="ghost"
              id="signUp"
              @click="handleSignUp"
            >
              注册
            </s-button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1>已有账号？</h1>
            <p>请使用您的账号进行登录</p>
            <s-button class="ghost" id="signIn" @click="handleSignIn">
              登录
            </s-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getEmailCode } from '@/api/auth'
import useUserStore from '@/store/modules/user'
import { rsaEnCrypt } from '@/utils/crypto'

const loginFormSchema = [
  {
    name: 'userName'
  },
  {
    name: 'pwd'
  },
  {
    name: 'fotget'
  },
  {
    name: 'button'
  }
]
const registerSchema = [
  {
    name: 'userName'
  },
  {
    name: 'password'
  },
  {
    name: 'confirm'
  },
  {
    name: 'email'
  },
  {
    name: 'phoneNumber'
  },
  {
    name: 'emailCode'
  },
  {
    name: 'button'
  }
]

const loginRules = {
  username: [
    {
      required: true,
      trigger: 'blur',
      message: '请输入用户名'
    }
  ],
  pwd: [{ required: true, trigger: 'blur', message: '请输入密码' }]
}
const regesiterRules = {
  username: [
    {
      required: true,
      trigger: 'blur',
      message: '请输入用户名'
    }
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 8, message: '密码长度不能小于8位', trigger: 'blur' }
  ],
  confirm: [
    {
      required: true,
      trigger: 'blur',
      message: '确认密码不能为空'
    },
    { validator: validateConfirm, trigger: 'blur' }
  ],
  email: [
    { required: true, message: '邮箱不能为空', trigger: 'blur' },
    {
      type: 'email',
      message: '请输入正确的邮箱格式',
      trigger: ['blur', 'change']
    }
  ],
  phoneNumber: [
    { required: true, message: '电话不能为空', trigger: 'blur' },
    {
      pattern: /^1[3456789]\d{9}$/,
      message: '手机号码格式不正确',
      trigger: 'blur'
    }
  ],
  emailCode: [{ required: true, message: '验证码不能为空', trigger: 'blur' }]
}

const router = useRouter()
const userStore = useUserStore()

const togglePanel = ref(false)

const loginFormRef = ref()
const loading = ref(false)
const forgetLoading = ref(false)

const isCounting = ref(false)
const codeText = ref('获取')
const registerFormRef = ref()

const loginFormState = ref({
  userName: undefined,
  pwd: undefined,
  password: undefined
})
const registerFormState = ref({
  userName: undefined,
  email: undefined,
  password: undefined,
  confirm: undefined,
  phoneNumber: undefined,
  emailCode: undefined
})

function handleSignUp() {
  togglePanel.value = true
}

function handleSignIn() {
  togglePanel.value = false
}

function validateConfirm(rule, value, callback) {
  if (value !== registerFormState.value.password) {
    callback(new Error('两次输入的密码不一致'))
  } else {
    callback()
  }
}

function handleLogin() {
  const query = router.currentRoute.value.query
  let path = query.redirect ?? '/'
  loginFormRef.value.validate((valid, fields) => {
    if (valid) {
      loginFormState.value.password = rsaEnCrypt(loginFormState.value.pwd)
      loading.value = true
      userStore
        .login(loginFormState.value)
        .then(() => {
          loading.value = false
          router.push({ path: path })
        })
        .catch(er => {
          loading.value = false
          console.log(er)
        })
    }
  })
}
function handleForget() {}

function handleGetCode() {
  let timer = null
  let seconds = 60

  if (isCounting.value) return

  let email = registerFormState.value.email

  registerFormRef.value.validateField(['email'], (valid, fields) => {
    if (valid) {
      getEmailCode(email).then(() => {
        isCounting.value = true
        codeText.value = `${seconds}s`
        timer = setInterval(() => {
          seconds--
          codeText.value = `${seconds}s`
          if (seconds <= 0) {
            clearInterval(timer)
            isCounting.value = false
            codeText.value = '重新获取'
          }
        }, 1000)
      })
    }
  })
}

function handleRegister() {
  const query = router.currentRoute.value.query
  let path = query.redirect ?? '/'
  registerFormRef.value.validate((valid, fields) => {
    if (valid) {
      loading.value = true
      userStore
        .register(registerFormState.value)
        .then(() => {
          loading.value = false
          router.push({ path: path })
        })
        .catch(er => {
          loading.value = false
          console.log(er)
        })
    }
  })
}
</script>

<style lang="scss" scoped>
//登录
@keyframes Gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.login-container {
  width: 100%;
  height: 100vh;
  //背景渐变
  background: linear-gradient(
    -45deg,
    #23cdf3,
    #0575e6,
    #fbc2eb,
    #0575e6,
    #23cdf3
  );
  background-size: 400% 400%;
  animation: Gradient 15s ease infinite;

  .login-form {
    width: 70%;
    height: 500px;
    top: 50%;
    left: 50%;
    margin-top: -250px;
    margin-left: -35%;
    position: absolute;
    overflow: hidden;
    border-radius: 24px;
    background-color: #ffffffb6;
    box-shadow: 5px 10px 50px #888888;

    .overlay-container {
      position: absolute;
      top: 0;
      left: 0%;
      width: 50%;
      height: 100%;
      overflow: hidden;
      transition: transform 0.6s ease-in-out;
      z-index: 100;
      .overlay:before {
        width: 100%;
        height: 100%;
        position: absolute;

        border-radius: 24px;
        content: '';
      }
      .overlay {
        position: relative;
        height: 100%;
        width: 200%;
        border-radius: 24px;
        color: #fff;
        background-image: url(@/assets/images/login.png);
        background-repeat: no-repeat;
        background-size: cover;
        transform: translateY(0);
        transition: transform 0.6s ease-in-out;

        .overlay-panel {
          position: absolute;
          top: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100%;
          width: 50%;
          text-align: center;
          transform: translateY(0);
          transition: transform 0.6s ease-in-out;
        }
        .overlay-left {
          transform: translateY(0);
        }
        .overlay-right {
          right: 0;
          transform: translateY(20%);
        }
      }
    }

    .form-container {
      position: absolute;
      top: 0;
      height: 100%;
      transition: all 0.6s ease-in-out;
    }

    .sign-in-container {
      left: 50%;
      width: 50%;
      z-index: 2;
      padding-top: 6%;
      .sign-in-title {
        text-align: center;
        color: #ffffff;
        font-size: 50px;
        text-shadow: 0 0 0.3rem #88e6e9;
      }

      .sign-in-body {
        width: 90%;
        margin-left: 5%;
        padding-top: 16px;

        .forget-button {
          margin-top: 16px;
          position: absolute;
          right: 0;
        }
      }
    }

    .sign-up-container {
      left: 0;
      width: 50%;
      z-index: 1;
      opacity: 0;
      transform: translateX(100%);

      .sign-up-title {
        margin-top: 24px;
        text-align: center;
        color: #ffffff;
        font-size: 50px;
        text-shadow: 0 0 0.3rem #88e6e9;
      }

      .sign-up-body {
        width: 80%;
        margin-left: 10%;
        padding-top: 16px;

        .username {
          margin-top: 16px;
        }

        .forget-button {
          margin-top: 16px;
          position: absolute;
          right: 0;
        }
      }
    }
  }

  .right-panel-active {
    .overlay-container {
      transform: translateX(100%);
      .overlay {
        transform: translateX(-50%);
        .overlay-left {
          transform: translateY(-20%);
        }
        .overlay-right {
          transform: translateY(0);
        }
      }
    }

    .sign-in-container {
      transform: translateY(100%);
    }

    .sign-up-container {
      transform: translateX(0);
      opacity: 1;
      z-index: 5;
    }
  }
}

.black-text {
  color: #383838;
}
</style>
