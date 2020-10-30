import { ToastController } from '@ionic/angular';
import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        private toastController: ToastController,
        private router: Router
    ) { }

    async presentToast(message: string, dur: number = 2500) {
        const toast = await this.toastController.create({
            message: message,
            duration: dur,
            color: 'danger',
            animated: true
        });
        toast.present();
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let text: string;
        return next.handle(req)
            .pipe(
                catchError(e => {
                    switch (e.status) {
                        case 401:
                            if (req.url.includes("/login")) {
                                text = "Παρουσιάστηκε σφάλμα κατά την διαδικασία της πιστοποίησης. Βεβαιωθείτε οτι έχετε συμπληρώσει σωστά το όνομα χρήστη και τον κωδικό και προσπαθήστε ξανά."
                                this.presentToast(text)
                            } else {
                                text = "Παρουσιάστηκε σφάλμα κατά την πιστοποίηση του χρήστη σας. Βεβαιωθείτε οτι είστε συνδεδεμένοι στο διαδίκτυο και κάντε ξανά είσοδο στο σύστημα."
                                this.presentToast(text)
                                this.router.navigate(['/auth/login'])
                            }
                            break;
                        case 403:
                            text = "Δεν έχετε δικαιώματα να πραγματοποιήσετε αυτήν την ενέργεια."
                            this.presentToast(text)
                            this.router.navigate(['/auth/login'])
                            break;
                        case 422:
                            text = "Παρουσιάστηκε σφάλμα κατά την αποστολή των δεδομένων."
                            this.presentToast(text)
                            break;
                        default:
                            text = "Παρουσιάστηκε σφάλμα κατά την επικοινωνία με τον server."
                            this.presentToast(text)
                            break;
                    }

                    return throwError(e);
                })
            )
    }

}
