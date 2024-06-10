import { UserEntity } from '../../infraestructure/database/entities/UserEntity';
import { UserRepository } from '../../infraestructure/repositories/UserRepository';


export class UserUseCase {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return await this.userRepository.findAll();
  }

  async createUser(name: string, email: string, cellphone: string, address: string): Promise<UserEntity> {
    const user = new UserEntity();
    user.name = name;
    user.email = email;
    user.cellphone = cellphone;
    user.address = address;
    return this.userRepository.save(user);
  }
}
