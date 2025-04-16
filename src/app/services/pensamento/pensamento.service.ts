import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pensamento } from 'src/app/interfaces/pensamento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PensamentoService {
  private urlApi = 'http://localhost:3000/pensamentos';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Pensamento[]> {
    return this.http.get<Pensamento[]>(this.urlApi);
  }

  save(pensamento : Pensamento): Observable<Pensamento> {
    return this.http.post<Pensamento>(this.urlApi, pensamento);
  }

  delete(id:number): Observable<Pensamento> {
    return this.http.delete<Pensamento>(`${this.urlApi}/${id}`);
  }
}
