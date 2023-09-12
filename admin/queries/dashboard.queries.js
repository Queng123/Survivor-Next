const createModel = require('../database/models/dashboard.model');

exports.saveJson = async (dashboard) => {
    try {
        let collectionName = dashboard['company-uuid'];
        const DashboardModel = createModel(collectionName);
        const updateData = new DashboardModel({
            _id: dashboard['company-uuid'],
            _timestamp: new Date(),
            "company-uuid": dashboard['company-uuid'],
            "group-token": dashboard['group-token'],
            "company-api-url": dashboard['company-api-url'],
            "extern-api-token": {
                "weather": dashboard['extern-api-token'].weather,
                "stock": dashboard['extern-api-token'].stock,
                "gpt3": dashboard['extern-api-token'].gpt3
            },
            "custom": {
                "background-1": dashboard.custom['background-1'],
                "background-1-dark": dashboard.custom['background-1-dark'],
                "background-2": dashboard.custom['background-2'],
                "background-2-dark": dashboard.custom['background-2-dark'],
                "background-3": dashboard.custom['background-3'],
                "background-3-dark": dashboard.custom['background-3-dark'],
                "background-4": dashboard.custom['background-4'],
                "background-4-dark": dashboard.custom['background-4-dark'],
                "button-primary": dashboard.custom['button-primary'],
                "button-primary-dark": dashboard.custom['button-primary-dark'],
                "button-secondary": dashboard.custom['button-secondary'],
                "button-secondary-dark": dashboard.custom['button-secondary-dark'],
                "button-primary-foreground": dashboard.custom['button-primary-foreground'],
                "button-primary-foreground-dark": dashboard.custom['button-primary-foreground-dark'],
                "button-secondary-foreground": dashboard.custom['button-secondary-foreground'],
                "button-secondary-foreground-dark": dashboard.custom['button-secondary-foreground-dark'],
                "title-primary": dashboard.custom['title-primary'],
                "title-primary-dark": dashboard.custom['title-primary-dark'],
                "title-secondary": dashboard.custom['title-secondary'],
                "title-secondary-dark": dashboard.custom['title-secondary-dark'],
                "text-primary": dashboard.custom['text-primary'],
                "text-primary-dark": dashboard.custom['text-primary-dark'],
                "text-secondary": dashboard.custom['text-secondary'],
                "text-secondary-dark": dashboard.custom['text-secondary-dark'],
                "default-language": dashboard.custom['default-language']
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