/**
 * 
 * 一些工具函数
 */
import { Platform, ToastAndroid } from 'react-native';
import _ from 'lodash';
import moment from 'moment';
import Toast from 'react-native-root-toast';

export default {
	dateString(momentObj, fallback = '') {
		return momentObj ? momentObj.format('YYYY-MM-DD') : fallback;
	},

	toDateTimeString(momentObj, fallback = '') {
		return momentObj ? momentObj.format('YYYY-MM-DD HH:mm:ss') : fallback;
	},

	toDateTimeStringFromMillis(timeMillis, fallback = '') {
		return timeMillis ? this.toDateTimeString(moment(timeMillis)) : fallback;
	},

	toDateTimeStringFormat(momentObj, format, fallback = '') {
		return momentObj ? momentObj.format(format) : fallback;
	},

	toDateTimeStringMidNight(momentObj, fallback = '') {
		return momentObj ? momentObj.format('YYYY-MM-DD 00:00:00') : fallback;
	},

	toDateTimeStringEndOfDay(momentObj, fallback = '') {
		return momentObj ? momentObj.format('YYYY-MM-DD 23:59:59') : fallback;
	},

	toArrayString(arr) {
		return arr ? arr.join(',') : null;
	},

	isIOS() {
		return Platform.OS === 'ios';
	},

	isAndroid() {
		return Platform.OS === 'android';
	},

	async sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	},

	showMessageToast(message, duration="SHORT", position='BOTTOM') {
		const durationOpt = {
			SHORT:Toast.durations.SHORT,
			LONG: Toast.durations.LONG 	
		}
		const positionOpt = {
			TOP: Toast.positions.TOP,
			CENTER: Toast.positions.CENTER,
			BOTTOM: Toast.positions.BOTTOM,
		}

		Toast.show(message, {
			duration: typeof duration==='number' ? duration : durationOpt[duration],
			position: typeof position==='number' ? position : positionOpt[position],
			backgroundColor: '#f00',
			shadow: true,
			animation: true,
			hideOnPress: true		
		});
	},

	isNumeric(value) {
		if (typeof value === 'number') {
			return true;
		} else {
			// eslint-disable-next-line
			return !isNaN(parseFloat(value)) && isFinite(value) && !value.includes('e')/* e.g. 1e+25 */;
		}
	},

	isInteger(value) {
		return this.isNumeric(value) && Number.isInteger(Number(value));
	},

	isPositiveInteger(value) {
		return this.isInteger(value) && Number(value) > 0;
	},

	isNonNegativeInteger(value) {
		return this.isInteger(value) && Number(value) >= 0;
	},

	parsePositiveInt(value, fallback) {
		const parsedInt = parseInt(value, 10);
		// eslint-disable-next-line
		return !isNaN(parsedInt) && parsedInt >= 1 ? parsedInt : fallback;
	},

	/**
	 * Promise.race
	 */
	promiseTimeout(promise, timeoutInMs, fallbackFn) {
		let id;
		const timeoutPromise = new Promise((resolve, reject) => {
			id = setTimeout(() => {
				resolve(fallbackFn());
			}, timeoutInMs);
		});

		return Promise.race([
			promise,
			timeoutPromise,
		]).then((result) => {
			clearTimeout(id);
			return result;
		});
	},
};
