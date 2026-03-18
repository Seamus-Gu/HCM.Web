<template>
  <div>
    <s-panel height="400px">
      <s-tag-cloud :api="getData" :height="350"></s-tag-cloud>
    </s-panel>
  </div>
</template>

<script>
let json = [
  {
    id: '440000202209261314',
    name: '朱磊',
    url: 'http://dummyimage.com/60x60'
  },
  {
    id: '110000197908243975',
    name: '杜娟',
    url: 'http://dummyimage.com/60x60'
  },
  {
    id: '420000200612318461',
    name: '姚霞',
    url: 'http://dummyimage.com/60x60'
  },
  {
    id: '620000201706066594',
    name: '石刚',
    url: 'http://dummyimage.com/60x60'
  },
  {
    id: '310000201801035750',
    name: '曾刚',
    url: 'http://dummyimage.com/60x60'
  },
  {
    id: '220000199709242202',
    name: '黎明',
    url: 'http://dummyimage.com/60x60'
  },
  {
    id: '370000200001287470',
    name: '秦超',
    url: 'http://dummyimage.com/60x60'
  },
  {
    id: '450000199709100418',
    name: '史娟',
    url: 'http://dummyimage.com/60x60'
  },
  {
    id: '500000200703266070',
    name: '贺平',
    url: 'http://dummyimage.com/60x60'
  },
  {
    id: '130000200002253956',
    name: '邱杰',
    url: 'http://dummyimage.com/60x60'
  },
  {
    id: '230000198007083945',
    name: '朱娟',
    url: 'http://dummyimage.com/60x60'
  },
  {
    id: '710000197903124012',
    name: '邵涛',
    url: 'http://dummyimage.com/60x60'
  },
  {
    id: '21000020040908121X',
    name: '尹艳',
    url: 'http://dummyimage.com/60x60'
  },
  {
    id: '350000200406138103',
    name: '锺平',
    url: 'http://dummyimage.com/60x60'
  },
  {
    id: '430000202003182862',
    name: '蒋霞',
    url: 'http://dummyimage.com/60x60'
  },
  {
    id: '360000201005306387',
    name: '胡刚',
    url: 'http://dummyimage.com/60x60'
  },
  {
    id: '350000202008181367',
    name: '常秀兰',
    url: 'http://dummyimage.com/60x60'
  },
  {
    id: '220000200812215523',
    name: '赵明',
    url: 'http://dummyimage.com/60x60'
  },
  {
    id: '990000198706021512',
    name: '曹强',
    url: 'http://dummyimage.com/60x60'
  },
  {
    id: '460000198307099490',
    name: '董超',
    url: 'http://dummyimage.com/60x60'
  },
  {
    id: '140000199906202533',
    name: '冯杰',
    url: 'http://dummyimage.com/60x60'
  },
  {
    id: '650000200806109628',
    name: '范勇',
    url: 'http://dummyimage.com/60x60'
  },
  {
    id: '430000198805061481',
    name: '罗芳',
    url: 'http://dummyimage.com/60x60'
  },
  {
    id: '410000198308190385',
    name: '姚平',
    url: 'http://dummyimage.com/60x60'
  },
  {
    id: '710000202210068840',
    name: '彭霞',
    url: 'http://dummyimage.com/60x60'
  },
  {
    id: '620000197706217664',
    name: '林磊',
    url: 'http://dummyimage.com/60x60'
  },
  {
    id: '450000198510118480',
    name: '罗霞',
    url: 'http://dummyimage.com/60x60'
  },
  {
    id: '220000201309238554',
    name: '常磊',
    url: 'http://dummyimage.com/60x60'
  },
  {
    id: '350000198604158148',
    name: '徐艳',
    url: 'http://dummyimage.com/60x60'
  },
  {
    id: '45000020080217752X',
    name: '秦磊',
    url: 'http://dummyimage.com/60x60'
  }
]
export default {
  props: {},
  setup() {
    const getData = async () => {
      return {
        code: 200,
        data: {
          items: json,
          total: 30
        },
        msg: 'success'
      }
    }
    return {
      getData
    }
  }
}
</script>
