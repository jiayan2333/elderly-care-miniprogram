
Page({
    data: {
        counselor: null,
        loading: true,
        currentBannerIndex: 0
    },

    onLoad(options) {
        const { id } = options;
        if (!id) {
            wx.showToast({
                title: '参数错误',
                icon: 'none'
            });
            setTimeout(() => {
                wx.navigateBack();
            }, 1500);
            return;
        }
        this.loadCounselorDetail(id);
    },

    loadCounselorDetail(id) {
        // 模拟数据
        const counselorData = {
            1: {
                id: 1,
                name: '齐婷',
                title: '国家二级心理咨询师 / 心理讲师',
                bannerImages: [
                    'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/心理关怀/心理咨询师3.1.png',
                    'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/心理关怀/心理咨询师3.2.jpg',
                    'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/心理关怀/心理咨询师3.3.jpg',
                    'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/心理关怀/心理咨询师3.4.jpg',
                    'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/心理关怀/心理咨询师3.5.jpg',
                    'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/心理关怀/心理咨询师3.6.jpg',
                    'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/心理关怀/心理咨询师3.7.jpg',
                    'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/心理关怀/心理咨询师3.8.jpg'
                ],
                experience: '8年从业经验',
                rating: 4.9,
                consultCount: 2800,
                price: '300元/小时',
                introduction: '国家二级心理咨询师、资深心理讲师，八年来深耕心理服务领域，累计开展心理讲座百余场，服务企业EAP项目多家，个案咨询时长超3000小时。多年心理服务经验让她积累了与不同群体沟通的智慧，尤其擅长与老年群体建立真诚、深入的信任关系。采用认知行为疗法、叙事疗法等多种专业方法，帮助老年朋友重塑生命意义，找到晚年生活的价值感与幸福感。',
                specialties: ['EAP企业心理服务', '心理讲座与团辅', '退休后角色转换', '认知行为疗法', '叙事疗法', '生命意义重塑'],
                education: '应用心理学专业 / 国家二级心理咨询师认证',
                tags: ['理论扎实', '实战丰富', '亲和力强']
            },
            2: {
                id: 2,
                name: '龚琳博',
                title: '心理咨询师',
                bannerImages: [
                    'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/心理关怀/心理咨询师1.1.jpg',
                    'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/心理关怀/心理咨询师1.2.jpg',
                    'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/心理关怀/心理咨询师1.3.jpg',
                    'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/心理关怀/心理咨询师1.4.jpg',
                    'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/心理关怀/心理咨询师1.5.png',
                    'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/心理关怀/心理咨询师1.6.png',
                    'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/心理关怀/心理咨询师1.7.png'
                ],
                experience: '3年从业经验',
                rating: 4.8,
                consultCount: 141,
                price: '150元/小时',
                introduction: '心理咨询师，武汉理工大学学士、武汉大学硕士研究生在读，专注于老年人心理关怀服务。擅长帮助老年朋友缓解孤独感、适应退休生活、改善睡眠质量，以耐心温和的态度陪伴每一位长者，用心倾听他们的故事与心事。',
                specialties: ['老年人心理辅导', '退休适应', '孤独感缓解', '睡眠改善'],
                education: '武汉理工大学学士 / 武汉大学硕士在读',
                tags: ['耐心细致', '温和可靠', '倾听陪伴']
            },
            3: {
                id: 3,
                name: '梁学锐',
                title: '心理咨询师',
                bannerImages: [
                    'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/心理关怀/心理咨询师2.1.jpg',
                    'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/心理关怀/心理咨询师2.2.jpg',
                    'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/心理关怀/心理咨询师2.3.jpg',
                    'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/心理关怀/心理咨询师2.4.jpg',
                    'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/心理关怀/心理咨询师2.5.jpg',
                    'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/心理关怀/心理咨询师2.6.png',
                    'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/心理关怀/心理咨询师2.7.png'
                ],
                experience: '2年从业经验',
                rating: 4.7,
                consultCount: 150,
                price: '150元/小时',
                introduction: '心理咨询师，黑龙江中医药大学学士，专注于老年人心理关怀服务。擅长帮助老年朋友缓解焦虑情绪、建立积极心态、提升生活幸福感，用真诚和专业为每一位长者提供温暖的心理支持。',
                specialties: ['老年人心理辅导', '焦虑情绪缓解', '积极心态培养', '幸福感提升'],
                education: '黑龙江中医药大学 心理学学士',
                tags: ['真诚热情', '专业可靠', '温暖陪伴']
            },
            4: {
                id: 4,
                name: '王帅',
                title: '心理咨询师',
                bannerImages: [
                    'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/心理关怀/心理咨询师4.1.jpg'
                ],
                experience: '2年从业经验',
                rating: 4.6,
                consultCount: 80,
                price: '150元/小时',
                introduction: '心理咨询师，齐齐哈尔大学学士，专注于老年人心理关怀领域。擅长通过积极心理学的视角帮助老年朋友发掘自身优势、建立健康的生活习惯、提升自我认同感。注重运用家庭系统理论，帮助老年人改善家庭关系、增进代际沟通，让每一位长者都能在温馨和谐的家庭氛围中享受幸福晚年。',
                specialties: ['积极心理学干预', '家庭关系调适', '生活习惯优化', '自我认同建设', '代际沟通促进'],
                education: '齐齐哈尔大学 心理学学士',
                tags: ['积极乐观', '善于引导', '贴心周到']
            },
            5: {
                id: 5,
                name: '李俊佚',
                title: '心理咨询师',
                bannerImages: [
                    'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/心理关怀/心理咨询师5.1.jpg'
                ],
                experience: '3年从业经验',
                rating: 4.7,
                consultCount: 120,
                price: '150元/小时',
                introduction: '心理咨询师，哈尔滨师范大学学士，专注于老年人心理关怀服务。擅长帮助老年朋友处理家庭关系、缓解生活压力、提升心理韧性，以理性专业的角度协助长者应对生活中的各种挑战。',
                specialties: ['家庭关系处理', '生活压力缓解', '心理韧性提升', '情绪管理'],
                education: '哈尔滨师范大学 心理学学士',
                tags: ['理性专业', '耐心负责', '善于分析']
            },
            6: {
                id: 6,
                name: '李洁',
                title: '心理咨询师',
                bannerImages: [
                    'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/心理关怀/心理咨询师6.1.jpg'
                ],
                experience: '3年从业经验',
                rating: 4.7,
                consultCount: 135,
                price: '150元/小时',
                introduction: '心理咨询师，东北林业大学学士，专注于老年人心理关怀服务。擅长帮助老年朋友应对丧偶之痛、重建生活信心、发现生活美好，用温暖的话语陪伴每一位长者走出困境，重新拥抱阳光。',
                specialties: ['丧偶心理支持', '生活信心重建', '积极心态培养', '情绪疏导'],
                education: '东北林业大学 心理学学士',
                tags: ['温暖体贴', '善解人意', '关怀备至']
            }
        };

        const counselor = counselorData[id];
        if (counselor) {
            this.setData({
                counselor,
                loading: false
            });
        } else {
            wx.showToast({
                title: '咨询师信息不存在',
                icon: 'none'
            });
            setTimeout(() => {
                wx.navigateBack();
            }, 1500);
        }
    },

    onBannerChange(e) {
        this.setData({
            currentBannerIndex: e.detail.current
        });
    },

    // 预览图片
    previewImage(e) {
        const { url, urls } = e.currentTarget.dataset;
        wx.previewImage({
            current: url,
            urls: urls
        });
    },

    onBookConsult() {
        wx.navigateToMiniProgram({
            appId: 'wxc4fc148a8d5c4c4b',
            path: '/pages/index/index?page_id=125749',
            success(res) {
                console.log('跳转成功', res)
            },
            fail(err) {
                console.error('跳转失败', err)
                wx.showToast({
                    title: '跳转失败',
                    icon: 'none'
                })
            }
        })
    }
})
