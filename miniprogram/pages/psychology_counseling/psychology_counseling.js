
Page({
    data: {
        counselorList: [
            {
                id: 1,
                name: '齐婷',
                avatar: 'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/心理关怀/心理咨询师3.1.png',
                introduction: '国家二级心理咨询师、资深心理讲师，八年来深耕心理服务领域，累计开展心理讲座百余场，服务企业EAP项目多家。特别擅长与老年群体建立深度信任关系，采用认知行为疗法、叙事疗法等方法，帮助老年朋友重塑生命意义...'
            },
            {
                id: 2,
                name: '龚琳博',
                avatar: 'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/心理关怀/心理咨询师1.1.jpg',
                introduction: '心理咨询师，武汉理工大学学士、武汉大学硕士研究生在读，专注于老年人心理关怀服务。擅长帮助老年朋友缓解孤独感、适应退休生活、改善睡眠质量...'
            },
            {
                id: 3,
                name: '梁学锐',
                avatar: 'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/心理关怀/心理咨询师2.1.jpg',
                introduction: '心理咨询师，黑龙江中医药大学学士，专注于老年人心理关怀服务。擅长帮助老年朋友缓解焦虑情绪、建立积极心态、提升生活幸福感...'
            },
            {
                id: 4,
                name: '王帅',
                avatar: 'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/心理关怀/心理咨询师4.1.jpg',
                introduction: '心理咨询师，齐齐哈尔大学学士，专注于老年人心理关怀服务。擅长帮助老年朋友建立情感支持系统、培养兴趣爱好、增强社会参与感...'
            },
            {
                id: 5,
                name: '李俊佚',
                avatar: 'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/心理关怀/心理咨询师5.1.jpg',
                introduction: '心理咨询师，哈尔滨师范大学学士，专注于老年人心理关怀服务。擅长帮助老年朋友处理家庭关系、缓解生活压力、提升心理韧性...'
            },
            {
                id: 6,
                name: '李洁',
                avatar: 'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/心理关怀/心理咨询师6.1.jpg',
                introduction: '心理咨询师，东北林业大学学士，专注于老年人心理关怀服务。擅长帮助老年朋友应对丧偶之痛、重建生活信心、发现生活美好...'
            }
        ]
    },

    onLoad(options) {

    },

    onCounselorTap(e) {
        const { id } = e.currentTarget.dataset;
        wx.navigateTo({
            url: `/pages/counselor_detail/counselor_detail?id=${id}`
        });
    }
})