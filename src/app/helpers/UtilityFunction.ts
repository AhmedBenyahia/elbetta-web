import {ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

/**
 *  This class contain utility function that are commonly used in the Application
 *  All Function should be static and pure
 */
export class UtilityFunction {
  static async getLoggedUserInfo(authService, router) {
    if (!authService.user) {
      await authService.refreshUserInfo();
    }
    if (!authService.user) {
      router.navigate(['/login']);
    } else {
      return authService.user;
    }
  }

  static getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
