const createModel = require('../database/models/dashboard.model');

exports.saveJson = async (dashboard) => {
    try {
        let collectionName = dashboard['company-uuid'];
        const DashboardModel = createModel(collectionName);
        const updateData = new DashboardModel({
            _id: dashboard['company-uuid'],
            _timestamp: new Date(),
            companyUuid: dashboard['company-uuid'],
            groupToken: dashboard['group-token'],
            companyApiUrl: dashboard['company-api-url'],
            externApiToken: {
                weather: dashboard['extern-api-token'].weather,
                stock: dashboard['extern-api-token'].stock,
                gpt3: dashboard['extern-api-token'].gpt3
            },
            custom: {
                background1: dashboard.custom['background-1'],
                background1Dark: dashboard.custom['background-1-dark'],
                background2: dashboard.custom['background-2'],
                background2Dark: dashboard.custom['background-2-dark'],
                background3: dashboard.custom['background-3'],
                background3Dark: dashboard.custom['background-3-dark'],
                background4: dashboard.custom['background-4'],
                background4Dark: dashboard.custom['background-4-dark'],
                buttonPrimary: dashboard.custom['button-primary'],
                buttonPrimaryDark: dashboard.custom['button-primary-dark'],
                buttonSecondary: dashboard.custom['button-secondary'],
                buttonSecondaryDark: dashboard.custom['button-secondary-dark'],
                buttonPrimaryForeground: dashboard.custom['button-primary-foreground'],
                buttonPrimaryForegroundDark: dashboard.custom['button-primary-foreground-dark'],
                buttonSecondaryForeground: dashboard.custom['button-secondary-foreground'],
                buttonSecondaryForegroundDark: dashboard.custom['button-secondary-foreground-dark'],
                titlePrimary: dashboard.custom['title-primary'],
                titlePrimaryDark: dashboard.custom['title-primary-dark'],
                titleSecondary: dashboard.custom['title-secondary'],
                titleSecondaryDark: dashboard.custom['title-secondary-dark'],
                textPrimary: dashboard.custom['text-primary'],
                textPrimaryDark: dashboard.custom['text-primary-dark'],
                textSecondary: dashboard.custom['text-secondary'],
                textSecondaryDark: dashboard.custom['text-secondary-dark'],
                defaultLanguage: dashboard.custom['default-language']
            },
            logo: {
                src: dashboard.logo['src'],
                logoData: dashboard.logo['logo-data'],
                alt: 'Company Logo'
            },
        });
        const options = { upsert: true, new: true, setDefaultsOnInsert: true };

        console.log(updateData.logo);
        const updatedDashboard = await DashboardModel.findOneAndUpdate(
            { _id: dashboard['company-uuid'] },
            updateData,
            options
        );
        return updatedDashboard;
    } catch (error) {
      throw(error);
    }
  }