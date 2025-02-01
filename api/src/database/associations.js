export default function registerAssociations(models) {
    // Chamar o método associate de cada modelo, se existir
    Object.values(models).forEach((model) => {
        if (model.associate) {
            model.associate(models);
        }
    });
}