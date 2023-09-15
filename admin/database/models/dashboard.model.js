const mongoose = require('mongoose');
const schema = mongoose.Schema;

function createModel(companyUuid) {
    if (mongoose.models[`dashboard_${companyUuid}`]) {
        return mongoose.model(`dashboard_${companyUuid}`);
    }

    const dashboardSchema = schema({
        _id: { type: String, required: true },
        _timestamp: { type: Date, required: true },
        "company-uuid": { type: String, required: true },
        "group-token": { type: String, required: true },
        "company-api-url": { type: String, required: true },
        "extern-api-token": {
            "weather": { type: String, required: true },
            "stock": { type: String, required: true },
            "gpt3": { type: String, required: true },
            "apod": { type: String, required: true },
        },
        "custom": {
            "background-1": { type: String, required: true },
            "background-1-dark": { type: String, required: true },
            "background-2": { type: String, required: true },
            "background-2-dark": { type: String, required: true },
            "background-3": { type: String, required: true },
            "background-3-dark": { type: String, required: true },
            "background-4": { type: String, required: true },
            "background-4-dark": { type: String, required: true },
            "button-primary": { type: String, required: true },
            "button-primary-dark": { type: String, required: true },
            "button-secondary": { type: String, required: true },
            "button-secondary-dark": { type: String, required: true },
            "button-primary-foreground": { type: String, required: true },
            "button-primary-foreground-dark": { type: String, required: true },
            "button-secondary-foreground": { type: String, required: true },
            "button-secondary-foreground-dark": { type: String, required: true },
            "title-primary": { type: String, required: true },
            "title-primary-dark": { type: String, required: true },
            "title-secondary": { type: String, required: true },
            "title-secondary-dark": { type: String, required: true },
            "text-primary": { type: String, required: true },
            "text-primary-dark": { type: String, required: true },
            "text-secondary": { type: String, required: true },
            "text-secondary-dark": { type: String, required: true },
            "default-language": { type: String, required: true }
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