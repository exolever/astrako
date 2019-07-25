module.exports = {
  suitesCollection: {
    // Regression UI comparison
    ui: 'e2e/ui/**/**.spec.js',
    uiPublic: 'e2e/ui/public.spec.js',
    uiEcosystem: 'e2e/ui/ecosystem.spec.js',
    uiOnboarding: 'e2e/ui/onboarding.spec.js',
    uiProject: 'e2e/ui/project.spec.js',
    // Regression
    //regression: 'e2e/**/project.spec.js',
    regression: 'e2e/**/ecosystem/**/directory.spec.js',
    // Test
    test: 'e2e/test.js',
  }
}