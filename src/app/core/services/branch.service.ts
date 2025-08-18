import { Injectable, signal } from '@angular/core';

export interface Branch {
  id: number;
  name: string;
  nameEn?: string;
  address?: string;
  phone?: string;
  workingHours?: string;
  isActive: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  private readonly BRANCH_KEY = 'zawy_active_branch';
  
  public activeBranch = signal<Branch | null>(null);
  public branches = signal<Branch[]>([
    {
      id: 1,
      name: 'بروست الزاوي نيو',
      nameEn: 'Zawy Broast New',
      address: 'شارع الرئيسي، القاهرة الجديدة',
      phone: '0100-000-0001',
      workingHours: '24/7',
      isActive: true
    },
    {
      id: 2,
      name: 'اولاد الزاوي للمشويات',
      nameEn: 'Awlad Al-Zawy for Grills',
      address: 'شارع الجامعة، المعادي',
      phone: '0100-000-0002',
      workingHours: '12:00 - 02:00',
      isActive: true
    }
  ]);
  
  constructor() {
    this.initializeActiveBranch();
  }
  
  private initializeActiveBranch(): void {
    const savedBranchId = localStorage.getItem(this.BRANCH_KEY);
    if (savedBranchId) {
      const branch = this.branches().find(b => b.id === parseInt(savedBranchId));
      if (branch) {
        this.activeBranch.set(branch);
        return;
      }
    }
    
    // Set first branch as default
    const firstBranch = this.branches()[0];
    if (firstBranch) {
      this.setActiveBranch(firstBranch);
    }
  }
  
  setActiveBranch(branch: Branch): void {
    this.activeBranch.set(branch);
    localStorage.setItem(this.BRANCH_KEY, branch.id.toString());
  }
  
  getBranchById(id: number): Branch | undefined {
    return this.branches().find(b => b.id === id);
  }
  
  getActiveBranchId(): number | null {
    return this.activeBranch()?.id || null;
  }
}
