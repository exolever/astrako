var ProfilePage = function() {
  this.avatar = $('exo-avatar-system');
  this.profileViews =  $$('app-profile-view-section');

  this.shareBtn = $('button');
  this.copyProfileURLBtn = $$('button').get(12);
  this.closeCopyProfileBtn = $$('button').get(13);

  this.personalInformationBtn = $$('button').get(1);
  this.aboutMeBtn = $$('button').get(2);

  this.shareProfile = async () => {
    await this.shareBtn.click();
    await this.copyProfileURLBtn.click();
    await this.closeCopyProfileBtn.click();
  };

  this.isDisplayed = async () => {
    return await this.avatar.isDisplayed()
  };

  this.goToPersonalInformation = async () => {
    await this.personalInformationBtn.click();
  };

  this.goToAboutMe = async () => {
    await this.aboutMeBtn.click();
  };

};
module.exports = ProfilePage;