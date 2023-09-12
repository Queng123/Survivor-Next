const mongoose = require('mongoose');
const schema = mongoose.Schema;

function createModel(companyUuid) {
    if (mongoose.models[`dashboard_${companyUuid}`]) {
        return mongoose.model(`dashboard_${companyUuid}`);
    }

    const dashboardSchema = schema({
        _id: { type: String, required: true },
        _timestamp: { type: Date, required: true },
        companyUuid: { type: String, required: true },
        groupToken: { type: String, required: false },
        companyApiUrl: { type: String, required: true },
        externApiToken: {
            weather: { type: String, required: true },
            stock: { type: String, required: true },
            gpt3: { type: String, required: true }
        },
        custom: {
            "bacground-1": { type: String, required: true },
            background1Dark: { type: String, required: true },
            background2: { type: String, required: true },
            background2Dark: { type: String, required: true },
            background3: { type: String, required: true },
            background3Dark: { type: String, required: true },
            background4: { type: String, required: true },
            background4Dark: { type: String, required: true },
            buttonPrimary: { type: String, required: true },
            buttonPrimaryDark: { type: String, required: true },
            buttonSecondary: { type: String, required: true },
            buttonSecondaryDark: { type: String, required: true },
            buttonPrimaryForeground: { type: String, required: true },
            buttonPrimaryForegroundDark: { type: String, required: true },
            buttonSecondaryForeground: { type: String, required: true },
            buttonSecondaryForegroundDark: { type: String, required: true },
            titlePrimary: { type: String, required: true },
            titlePrimaryDark: { type: String, required: true },
            titleSecondary: { type: String, required: true },
            titleSecondaryDark: { type: String, required: true },
            textPrimary: { type: String, required: true },
            textPrimaryDark: { type: String, required: true },
            textSecondary: { type: String, required: true },
            textSecondaryDark: { type: String, required: true },
            defaultLanguage: { type: String, required: true }
        },
        logo: {
            src: { type: schema.Types.Mixed, required: true },
            logoData: { type: String, required: true },
            alt: { type: String, required: true }
        }
    });

    return mongoose.model(`dashboard_${companyUuid}`, dashboardSchema);
}

module.exports = createModel;