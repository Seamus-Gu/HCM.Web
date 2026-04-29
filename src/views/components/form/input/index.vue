<template>
  <div class="example-input-container">
    <s-panel title="基础用法">
      <s-row>Element-Plus</s-row>
      <s-row>
        <el-input v-model="input1" placeholder="Please input" />
      </s-row>

      <s-row>封装</s-row>
      <s-row>
        <s-input v-model="input1" placeholder="Please input" />
      </s-row>
    </s-panel>

    <s-panel title="禁用状态">
      <s-row>Element-Plus</s-row>
      <s-row>
        <el-input v-model="input2" disabled placeholder="Please input" />
      </s-row>

      <s-row>封装</s-row>
      <s-row>
        <s-input v-model="input2" disabled placeholder="Please input" />
      </s-row>
    </s-panel>

    <s-panel title="一键清空">
      <s-row>Element-Plus</s-row>
      <s-row>
        <el-input v-model="input3" placeholder="Please input" clearable />
      </s-row>

      <s-row>封装</s-row>
      <s-row>
        <s-input v-model="input3" placeholder="Please input" clearable />
      </s-row>
    </s-panel>

    <s-panel title="格式化">
      <s-row>Element-Plus</s-row>
      <s-row>
        <el-input
          v-model="input4"
          placeholder="Please input"
          :formatter="
            value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          "
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        />
      </s-row>

      <s-row>封装</s-row>
      <s-row>
        <s-input
          v-model="input4"
          placeholder="Please input"
          :formatter="
            value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          "
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        />
      </s-row>
    </s-panel>

    <s-panel title="密码框">
      <s-row>Element-Plus</s-row>
      <s-row>
        <el-input v-model="input5" placeholder="Please input" show-password />
      </s-row>

      <s-row>封装</s-row>
      <s-row>
        <s-input v-model="input5" placeholder="Please input" show-password />
      </s-row>
    </s-panel>

    <s-panel title="带图标的输入框">
      <s-row>Element-Plus</s-row>
      <s-row>
        <el-input v-model="input6" placeholder="Please input">
          <template #prefix>
            <svg class="icon" ariel-hidden="true">
              <use xlink:href="#icon-search" />
            </svg>
          </template>
        </el-input>
      </s-row>
      <s-row>
        <el-input v-model="input6" placeholder="Please input">
          <template #suffix>
            <svg class="icon" ariel-hidden="true">
              <use xlink:href="#icon-search" />
            </svg>
          </template>
        </el-input>
      </s-row>

      <s-row>封装</s-row>
      <s-row>
        <s-input v-model="input6" placeholder="Please input">
          <template #prefix>
            <svg class="icon" ariel-hidden="true">
              <use xlink:href="#icon-search" />
            </svg>
          </template>
        </s-input>
      </s-row>
      <s-row>
        <s-input v-model="input6" placeholder="Please input">
          <template #suffix>
            <svg class="icon" ariel-hidden="true">
              <use xlink:href="#icon-search" />
            </svg>
          </template>
        </s-input>
      </s-row>
    </s-panel>

    <s-panel title="复合型输入框">
      <s-row>Element-Plus</s-row>
      <s-row>
        <el-input v-model="input7" placeholder="Please input">
          <template #prepend>Http://</template>
        </el-input>
      </s-row>
      <s-row>
        <el-input v-model="input7" placeholder="Please input">
          <template #append>.com</template>
        </el-input>
      </s-row>
      <s-row>
        <el-input
          v-model="input7"
          placeholder="Please input"
          class="input-with-select"
        >
          <template #prepend>
            <el-select
              v-model="select"
              placeholder="Select"
              style="width: 115px"
            >
              <el-option label="Restaurant" value="1" />
              <el-option label="Order No." value="2" />
              <el-option label="Tel" value="3" />
            </el-select>
          </template>
          <template #append>
            <svg class="icon" ariel-hidden="true">
              <use xlink:href="#icon-search" />
            </svg>
          </template>
        </el-input>
      </s-row>

      <s-row>封装</s-row>
      <s-row>
        <s-input v-model="input7" placeholder="Please input">
          <template #prepend>Http://</template>
        </s-input>
      </s-row>
      <s-row>
        <s-input v-model="input7" placeholder="Please input">
          <template #append>.com</template>
        </s-input>
      </s-row>
      <s-row>
        <s-input
          v-model="input7"
          placeholder="Please input"
          class="input-with-select"
        >
          <template #prepend>
            <el-select
              v-model="select"
              placeholder="Select"
              style="width: 115px"
            >
              <el-option label="Restaurant" value="1" />
              <el-option label="Order No." value="2" />
              <el-option label="Tel" value="3" />
            </el-select>
          </template>
          <template #append>
            <svg class="icon" ariel-hidden="true">
              <use xlink:href="#icon-search" />
            </svg>
          </template>
        </s-input>
      </s-row>
    </s-panel>

    <s-panel title="尺寸">
      <s-row>Element-Plus</s-row>
      <s-row>
        <el-input v-model="input1" placeholder="Please input" />
      </s-row>

      <s-row>封装</s-row>
      <s-row>
        <s-input v-model="input1" placeholder="Please input" />
      </s-row>
    </s-panel>

    <s-panel title="输入长度限制">
      <s-row>Element-Plus</s-row>
      <s-row>
        <el-input v-model="input1" placeholder="Please input" />
      </s-row>

      <s-row>封装</s-row>
      <s-row>
        <s-input v-model="input1" placeholder="Please input" />
      </s-row>
    </s-panel>
  </div>
</template>

<script>
export default {
  setup() {
    const input1 = ref()
    const input2 = ref('zxczxcasd')
    const input3 = ref()
    const input4 = ref()
    const input5 = ref()
    const input6 = ref()
    const input7 = ref()
    const input8 = ref()
    const select = ref()

    const methods = reactive({
      test: val => {
        console.log(111)
      }
    })

    return {
      input1,
      input2,
      input3,
      input4,
      input5,
      input6,
      input7,
      input8,
      select,

      ...toRefs(methods)
    }
  }
}
</script>
