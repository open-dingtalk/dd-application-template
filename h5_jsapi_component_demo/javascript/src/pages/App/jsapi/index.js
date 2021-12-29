import requestAuthCode from './runtime.permission.requestAuthCode'
import pickConversation from './biz.chat.pickConversation'
import chooseConversationByCorpId from './biz.chat.chooseConversationByCorpId'
import toConversation from './biz.chat.toConversation'
import openSingleChat from './biz.chat.openSingleChat'
import chooseMobileContacts from './biz.contact.chooseMobileContacts'
import multipleChoose from './biz.customContact.multipleChoose'
import choose from './biz.customContact.choose'
import complexPicker from './biz.contact.complexPicker'
import departmentsPicker from './biz.contact.departmentsPicker'
import externalComplexPicker from './biz.contact.externalComplexPicker'
import externalEditForm from './biz.contact.externalEditForm'
import createGroup from './biz.contact.createGroup'
import getNetworkType from './device.connection.getNetworkType'
import vibrate from './device.notification.vibrate'
import scan from './biz.util.scan'
import getWifiStatus from './device.base.getWifiStatus'
import getPhoneInfo from './device.base.getPhoneInfo'
import createDing from './biz.ding.create'
import saveFile from './biz.cspace.saveFile'
import chooseSpaceDir from './biz.cspace.chooseSpaceDir'
import getUUID from './device.base.getUUID'
import previewImage from './biz.util.previewImage'
import getGeolocation from './device.geolocation.get'
import openLink from './biz.util.openLink'
import showCallMenu from './biz.telephone.showCallMenu'
import checkBizCall from './biz.telephone.checkBizCall'
import toast from './device.notification.toast'
import alert from './device.notification.alert'
import confirm from './device.notification.confirm'
import showPreloader from './device.notification.showPreloader'
import actionSheet from './device.notification.actionSheet'
import chosen from './biz.util.chosen'
import datepicker from './biz.util.datepicker'
import timepicker from './biz.util.timepicker'
import datetimepicker from './biz.util.datetimepicker'
import chooseDateTime from './biz.calendar.chooseDateTime'
import openApp from './biz.util.open'
import goBack from './biz.navigation.goBack'

const exportJsapiComponent = {
    'runtime.permission.requestAuthCode': requestAuthCode,
    'biz.chat.pickConversation': pickConversation,
    'biz.chat.chooseConversationByCorpId': chooseConversationByCorpId,
    'biz.chat.toConversation': toConversation,
    'biz.chat.openSingleChat': openSingleChat,
    'biz.contact.chooseMobileContacts': chooseMobileContacts,
    'biz.customContact.multipleChoose': multipleChoose,
    'biz.customContact.choose': choose,
    'biz.contact.complexPicker': complexPicker,
    'biz.contact.departmentsPicker': departmentsPicker,
    'biz.contact.externalComplexPicker': externalComplexPicker,
    'biz.contact.externalEditForm': externalEditForm,
    'biz.contact.createGroup': createGroup,
    'device.connection.getNetworkType': getNetworkType,
    'device.notification.vibrate': vibrate,
    'biz.util.scan': scan,
    'device.base.getWifiStatus': getWifiStatus,
    'device.base.getPhoneInfo': getPhoneInfo,
    'biz.ding.create': createDing,
    'biz.cspace.saveFile': saveFile,
    'biz.cspace.chooseSpaceDir': chooseSpaceDir,
    'device.base.getUUID': getUUID,
    'biz.util.previewImage': previewImage,
    'device.geolocation.get': getGeolocation,
    'biz.util.openLink': openLink,
    'biz.telephone.showCallMenu': showCallMenu,
    'biz.telephone.checkBizCall': checkBizCall,
    'device.notification.toast': toast,
    'device.notification.alert': alert,
    'device.notification.confirm': confirm,
    'device.notification.showPreloader': showPreloader,
    'device.notification.actionSheet': actionSheet,
    'biz.util.chosen': chosen,
    'biz.util.datepicker': datepicker,
    'biz.util.timepicker': timepicker,
    'biz.util.datetimepicker': datetimepicker,
    'biz.calendar.chooseDateTime': chooseDateTime,
    'biz.util.open': openApp,
    'biz.navigation.goBack': goBack,
};

export default exportJsapiComponent;