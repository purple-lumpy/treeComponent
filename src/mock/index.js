import Mock from 'mockjs'

export const data = Mock.mock({
    title: 'root',
    id: '0',
    'children|10000': [{
        title: 'son',
        'id|+1': 1
    }]
});

