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
};

export default exportJsapiComponent;