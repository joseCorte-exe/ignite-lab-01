import { UseGuards } from '@nestjs/common';
import {
  Parent,
  Query,
  ResolveField,
  ResolveReference,
  Resolver,
} from '@nestjs/graphql';
import { CustomersService } from '../../../services/customers.service';
import { PurchasesService } from '../../../services/purchases.service';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { AuthUser, CurrentUser } from '../../auth/current-user';
import { Customer } from '../models/customer';
import { Purchase } from '../models/purchase';

@Resolver(() => Customer)
export class CustomersResolver {
  constructor(
    private customerService: CustomersService,
    private purchasesService: PurchasesService,
  ) {}

  @UseGuards(AuthorizationGuard)
  @Query(() => Customer)
  me(@CurrentUser() user: AuthUser) {
    return this.customerService.getCustomerByAuthUserId(user.sub);
  }

  @ResolveField(() => [Purchase])
  purchases(@Parent() customer: Customer) {
    return this.purchasesService.listAllFromCustomer(customer.id);
  }

  @ResolveReference()
  resolverReference(reference: { authUserId: string }) {
    return this.customerService.getCustomerByAuthUserId(reference.authUserId);
  }
}
